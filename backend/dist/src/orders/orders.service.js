"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let OrdersService = class OrdersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(userId, userRole, userCountry) {
        const where = {};
        if (userRole !== client_1.Role.ADMIN && userCountry) {
            where.country = userCountry;
        }
        if (userRole === client_1.Role.MEMBER) {
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
    async findOne(id, userId, userRole, userCountry) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                items: {
                    include: { menuItem: true },
                },
            },
        });
        if (!order)
            return null;
        if (userRole !== client_1.Role.ADMIN && userCountry && order.country !== userCountry) {
            throw new common_1.ForbiddenException('Access denied to orders from other countries');
        }
        if (userRole === client_1.Role.MEMBER && order.userId !== userId) {
            throw new common_1.ForbiddenException('You can only view your own orders');
        }
        return order;
    }
    async create(userId, userCountry, input) {
        const firstItem = input.items[0];
        const menuItem = await this.prisma.menuItem.findUnique({
            where: { id: firstItem.menuItemId },
            include: { restaurant: true },
        });
        if (!menuItem) {
            throw new common_1.NotFoundException('Menu item not found');
        }
        const orderCountry = menuItem.restaurant.country;
        if (userCountry && orderCountry !== userCountry) {
            throw new common_1.ForbiddenException('You can only order from restaurants in your country');
        }
        const menuItemIds = input.items.map(i => i.menuItemId);
        const menuItems = await this.prisma.menuItem.findMany({
            where: { id: { in: menuItemIds } },
        });
        const itemsWithPrice = input.items.map(item => {
            const menuItem = menuItems.find(m => m.id === item.menuItemId);
            if (!menuItem)
                throw new common_1.NotFoundException(`Menu item ${item.menuItemId} not found`);
            return {
                menuItemId: item.menuItemId,
                quantity: item.quantity,
                price: menuItem.price,
            };
        });
        const totalAmount = itemsWithPrice.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return this.prisma.order.create({
            data: {
                userId,
                country: orderCountry,
                status: client_1.OrderStatus.PENDING,
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
    async addItem(userId, input) {
        const order = await this.prisma.order.findUnique({
            where: { id: input.orderId },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (order.userId !== userId)
            throw new common_1.ForbiddenException('Not your order');
        if (order.status !== client_1.OrderStatus.PENDING) {
            throw new common_1.BadRequestException('Cannot modify a placed or cancelled order');
        }
        const menuItem = await this.prisma.menuItem.findUnique({
            where: { id: input.menuItemId },
        });
        if (!menuItem)
            throw new common_1.NotFoundException('Menu item not found');
        const existingItem = await this.prisma.orderItem.findFirst({
            where: { orderId: input.orderId, menuItemId: input.menuItemId },
        });
        if (existingItem) {
            await this.prisma.orderItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + input.quantity },
            });
        }
        else {
            await this.prisma.orderItem.create({
                data: {
                    orderId: input.orderId,
                    menuItemId: input.menuItemId,
                    quantity: input.quantity,
                    price: menuItem.price,
                },
            });
        }
        return this.recalculateTotal(input.orderId);
    }
    async updateItemQuantity(userId, input) {
        const orderItem = await this.prisma.orderItem.findUnique({
            where: { id: input.orderItemId },
            include: { order: true },
        });
        if (!orderItem)
            throw new common_1.NotFoundException('Order item not found');
        if (orderItem.order.userId !== userId)
            throw new common_1.ForbiddenException('Not your order');
        if (orderItem.order.status !== client_1.OrderStatus.PENDING) {
            throw new common_1.BadRequestException('Cannot modify a placed or cancelled order');
        }
        if (input.quantity === 0) {
            await this.prisma.orderItem.delete({ where: { id: input.orderItemId } });
        }
        else {
            await this.prisma.orderItem.update({
                where: { id: input.orderItemId },
                data: { quantity: input.quantity },
            });
        }
        return this.recalculateTotal(orderItem.orderId);
    }
    async placeOrder(userId, userRole, input) {
        if (userRole === client_1.Role.MEMBER) {
            throw new common_1.ForbiddenException('Members cannot place orders. Contact your manager.');
        }
        const order = await this.prisma.order.findUnique({
            where: { id: input.orderId },
            include: { items: true },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (order.status !== client_1.OrderStatus.PENDING) {
            throw new common_1.BadRequestException('Order has already been placed or cancelled');
        }
        if (order.items.length === 0) {
            throw new common_1.BadRequestException('Cannot place an empty order');
        }
        return this.prisma.order.update({
            where: { id: input.orderId },
            data: {
                status: client_1.OrderStatus.PLACED,
                paymentMethodId: input.paymentMethodId,
            },
            include: {
                items: {
                    include: { menuItem: true },
                },
            },
        });
    }
    async cancelOrder(orderId, userId, userRole, userCountry) {
        if (userRole === client_1.Role.MEMBER) {
            throw new common_1.ForbiddenException('Members cannot cancel orders. Contact your manager.');
        }
        const order = await this.prisma.order.findUnique({ where: { id: orderId } });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (userRole === client_1.Role.MANAGER && userCountry && order.country !== userCountry) {
            throw new common_1.ForbiddenException('You can only cancel orders from your country');
        }
        if (order.status === client_1.OrderStatus.CANCELLED) {
            throw new common_1.BadRequestException('Order is already cancelled');
        }
        return this.prisma.order.update({
            where: { id: orderId },
            data: { status: client_1.OrderStatus.CANCELLED },
            include: {
                items: {
                    include: { menuItem: true },
                },
            },
        });
    }
    async getCurrentCart(userId) {
        return this.prisma.order.findFirst({
            where: {
                userId,
                status: client_1.OrderStatus.PENDING,
            },
            include: {
                items: {
                    include: { menuItem: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async recalculateTotal(orderId) {
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
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map