import { Injectable, ForbiddenException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Country, OrderStatus, Role } from '@prisma/client';
import { CreateOrderInput, AddItemInput, UpdateItemQuantityInput, PlaceOrderInput } from './dto/order.input';

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService) { }

    /**
     * Get all orders for a user (filtered by country for non-admins)
     */
    async findAll(userId: string, userRole: Role, userCountry: Country | null) {
        const where: any = {};

        // Admins see all orders, others see only their country
        if (userRole !== Role.ADMIN && userCountry) {
            where.country = userCountry;
        }

        // If not admin, only show user's own orders
        if (userRole === Role.MEMBER) {
            where.userId = userId;
        }

        return this.prisma.order.findMany({
            where,
            include: {
                items: {
                    include: { menuItem: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    /**
     * Get a single order by ID
     */
    async findOne(id: string, userId: string, userRole: Role, userCountry: Country | null) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                items: {
                    include: { menuItem: true },
                },
            },
        });

        if (!order) return null;

        // Check country access for non-admins
        if (userRole !== Role.ADMIN && userCountry && order.country !== userCountry) {
            throw new ForbiddenException('Access denied to orders from other countries');
        }

        // Members can only see their own orders
        if (userRole === Role.MEMBER && order.userId !== userId) {
            throw new ForbiddenException('You can only view your own orders');
        }

        return order;
    }

    /**
     * Create a new order (cart) - All roles can do this
     */
    async create(userId: string, userCountry: Country | null, input: CreateOrderInput) {
        // Determine country from first menu item's restaurant
        const firstItem = input.items[0];
        const menuItem = await this.prisma.menuItem.findUnique({
            where: { id: firstItem.menuItemId },
            include: { restaurant: true },
        });

        if (!menuItem) {
            throw new NotFoundException('Menu item not found');
        }

        const orderCountry = menuItem.restaurant.country;

        // Non-admins can only order from their country
        if (userCountry && orderCountry !== userCountry) {
            throw new ForbiddenException('You can only order from restaurants in your country');
        }

        // Calculate total
        const menuItemIds = input.items.map(i => i.menuItemId);
        const menuItems = await this.prisma.menuItem.findMany({
            where: { id: { in: menuItemIds } },
        });

        const itemsWithPrice = input.items.map(item => {
            const menuItem = menuItems.find(m => m.id === item.menuItemId);
            if (!menuItem) throw new NotFoundException(`Menu item ${item.menuItemId} not found`);
            return {
                menuItemId: item.menuItemId,
                quantity: item.quantity,
                price: menuItem.price,
            };
        });

        const totalAmount = itemsWithPrice.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0,
        );

        return this.prisma.order.create({
            data: {
                userId,
                country: orderCountry,
                status: OrderStatus.PENDING,
                totalAmount,
                items: {
                    create: itemsWithPrice,
                },
            },
            include: {
                items: {
                    include: { menuItem: true },
                },
            },
        });
    }

    /**
     * Add item to existing order (cart)
     */
    async addItem(userId: string, input: AddItemInput) {
        const order = await this.prisma.order.findUnique({
            where: { id: input.orderId },
        });

        if (!order) throw new NotFoundException('Order not found');
        if (order.userId !== userId) throw new ForbiddenException('Not your order');
        if (order.status !== OrderStatus.PENDING) {
            throw new BadRequestException('Cannot modify a placed or cancelled order');
        }

        const menuItem = await this.prisma.menuItem.findUnique({
            where: { id: input.menuItemId },
        });

        if (!menuItem) throw new NotFoundException('Menu item not found');

        // Check if item already in order
        const existingItem = await this.prisma.orderItem.findFirst({
            where: { orderId: input.orderId, menuItemId: input.menuItemId },
        });

        if (existingItem) {
            // Update quantity
            await this.prisma.orderItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + input.quantity },
            });
        } else {
            // Create new item
            await this.prisma.orderItem.create({
                data: {
                    orderId: input.orderId,
                    menuItemId: input.menuItemId,
                    quantity: input.quantity,
                    price: menuItem.price,
                },
            });
        }

        // Recalculate total
        return this.recalculateTotal(input.orderId);
    }

    /**
     * Update item quantity in order
     */
    async updateItemQuantity(userId: string, input: UpdateItemQuantityInput) {
        const orderItem = await this.prisma.orderItem.findUnique({
            where: { id: input.orderItemId },
            include: { order: true },
        });

        if (!orderItem) throw new NotFoundException('Order item not found');
        if (orderItem.order.userId !== userId) throw new ForbiddenException('Not your order');
        if (orderItem.order.status !== OrderStatus.PENDING) {
            throw new BadRequestException('Cannot modify a placed or cancelled order');
        }

        if (input.quantity === 0) {
            // Remove item
            await this.prisma.orderItem.delete({ where: { id: input.orderItemId } });
        } else {
            // Update quantity
            await this.prisma.orderItem.update({
                where: { id: input.orderItemId },
                data: { quantity: input.quantity },
            });
        }

        return this.recalculateTotal(orderItem.orderId);
    }

    /**
     * Place order (checkout) - Admin and Manager only
     */
    async placeOrder(userId: string, userRole: Role, input: PlaceOrderInput) {
        // Check role
        if (userRole === Role.MEMBER) {
            throw new ForbiddenException('Members cannot place orders. Contact your manager.');
        }

        const order = await this.prisma.order.findUnique({
            where: { id: input.orderId },
            include: { items: true },
        });

        if (!order) throw new NotFoundException('Order not found');
        if (order.status !== OrderStatus.PENDING) {
            throw new BadRequestException('Order has already been placed or cancelled');
        }
        if (order.items.length === 0) {
            throw new BadRequestException('Cannot place an empty order');
        }

        return this.prisma.order.update({
            where: { id: input.orderId },
            data: {
                status: OrderStatus.PLACED,
                paymentMethodId: input.paymentMethodId,
            },
            include: {
                items: {
                    include: { menuItem: true },
                },
            },
        });
    }

    /**
     * Cancel order - Admin and Manager only
     */
    async cancelOrder(orderId: string, userId: string, userRole: Role, userCountry: Country | null) {
        // Check role
        if (userRole === Role.MEMBER) {
            throw new ForbiddenException('Members cannot cancel orders. Contact your manager.');
        }

        const order = await this.prisma.order.findUnique({ where: { id: orderId } });

        if (!order) throw new NotFoundException('Order not found');

        // Check country access for managers
        if (userRole === Role.MANAGER && userCountry && order.country !== userCountry) {
            throw new ForbiddenException('You can only cancel orders from your country');
        }

        if (order.status === OrderStatus.CANCELLED) {
            throw new BadRequestException('Order is already cancelled');
        }

        return this.prisma.order.update({
            where: { id: orderId },
            data: { status: OrderStatus.CANCELLED },
            include: {
                items: {
                    include: { menuItem: true },
                },
            },
        });
    }

    /**
     * Get current cart (pending order) for user
     */
    async getCurrentCart(userId: string) {
        return this.prisma.order.findFirst({
            where: {
                userId,
                status: OrderStatus.PENDING,
            },
            include: {
                items: {
                    include: { menuItem: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    /**
     * Recalculate order total
     */
    private async recalculateTotal(orderId: string) {
        const items = await this.prisma.orderItem.findMany({
            where: { orderId },
        });

        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        return this.prisma.order.update({
            where: { id: orderId },
            data: { totalAmount: total },
            include: {
                items: {
                    include: { menuItem: true },
                },
            },
        });
    }
}
