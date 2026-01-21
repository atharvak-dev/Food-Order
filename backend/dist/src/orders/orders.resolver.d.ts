import { OrdersService } from './orders.service';
import { CreateOrderInput, AddItemInput, UpdateItemQuantityInput, PlaceOrderInput } from './dto/order.input';
interface UserContext {
    id: string;
    email: string;
    role: string;
    country: string | null;
}
export declare class OrdersResolver {
    private ordersService;
    constructor(ordersService: OrdersService);
    orders(user: UserContext): Promise<({
        items: ({
            menuItem: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                price: number;
                description: string;
                imageUrl: string;
                category: string;
                isVegetarian: boolean;
                restaurantId: string;
            };
        } & {
            menuItemId: string;
            quantity: number;
            orderId: string;
            id: string;
            createdAt: Date;
            price: number;
        })[];
    } & {
        paymentMethodId: string | null;
        id: string;
        userId: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalAmount: number;
        country: import("@prisma/client").$Enums.Country;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    order(id: string, user: UserContext): Promise<({
        items: ({
            menuItem: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                price: number;
                description: string;
                imageUrl: string;
                category: string;
                isVegetarian: boolean;
                restaurantId: string;
            };
        } & {
            menuItemId: string;
            quantity: number;
            orderId: string;
            id: string;
            createdAt: Date;
            price: number;
        })[];
    } & {
        paymentMethodId: string | null;
        id: string;
        userId: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalAmount: number;
        country: import("@prisma/client").$Enums.Country;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    currentCart(user: UserContext): Promise<({
        items: ({
            menuItem: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                price: number;
                description: string;
                imageUrl: string;
                category: string;
                isVegetarian: boolean;
                restaurantId: string;
            };
        } & {
            menuItemId: string;
            quantity: number;
            orderId: string;
            id: string;
            createdAt: Date;
            price: number;
        })[];
    } & {
        paymentMethodId: string | null;
        id: string;
        userId: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalAmount: number;
        country: import("@prisma/client").$Enums.Country;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    createOrder(input: CreateOrderInput, user: UserContext): Promise<{
        items: ({
            menuItem: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                price: number;
                description: string;
                imageUrl: string;
                category: string;
                isVegetarian: boolean;
                restaurantId: string;
            };
        } & {
            menuItemId: string;
            quantity: number;
            orderId: string;
            id: string;
            createdAt: Date;
            price: number;
        })[];
    } & {
        paymentMethodId: string | null;
        id: string;
        userId: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalAmount: number;
        country: import("@prisma/client").$Enums.Country;
        createdAt: Date;
        updatedAt: Date;
    }>;
    addItemToOrder(input: AddItemInput, user: UserContext): Promise<{
        items: ({
            menuItem: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                price: number;
                description: string;
                imageUrl: string;
                category: string;
                isVegetarian: boolean;
                restaurantId: string;
            };
        } & {
            menuItemId: string;
            quantity: number;
            orderId: string;
            id: string;
            createdAt: Date;
            price: number;
        })[];
    } & {
        paymentMethodId: string | null;
        id: string;
        userId: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalAmount: number;
        country: import("@prisma/client").$Enums.Country;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateOrderItemQuantity(input: UpdateItemQuantityInput, user: UserContext): Promise<{
        items: ({
            menuItem: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                price: number;
                description: string;
                imageUrl: string;
                category: string;
                isVegetarian: boolean;
                restaurantId: string;
            };
        } & {
            menuItemId: string;
            quantity: number;
            orderId: string;
            id: string;
            createdAt: Date;
            price: number;
        })[];
    } & {
        paymentMethodId: string | null;
        id: string;
        userId: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalAmount: number;
        country: import("@prisma/client").$Enums.Country;
        createdAt: Date;
        updatedAt: Date;
    }>;
    placeOrder(input: PlaceOrderInput, user: UserContext): Promise<{
        items: ({
            menuItem: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                price: number;
                description: string;
                imageUrl: string;
                category: string;
                isVegetarian: boolean;
                restaurantId: string;
            };
        } & {
            menuItemId: string;
            quantity: number;
            orderId: string;
            id: string;
            createdAt: Date;
            price: number;
        })[];
    } & {
        paymentMethodId: string | null;
        id: string;
        userId: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalAmount: number;
        country: import("@prisma/client").$Enums.Country;
        createdAt: Date;
        updatedAt: Date;
    }>;
    cancelOrder(orderId: string, user: UserContext): Promise<{
        items: ({
            menuItem: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                price: number;
                description: string;
                imageUrl: string;
                category: string;
                isVegetarian: boolean;
                restaurantId: string;
            };
        } & {
            menuItemId: string;
            quantity: number;
            orderId: string;
            id: string;
            createdAt: Date;
            price: number;
        })[];
    } & {
        paymentMethodId: string | null;
        id: string;
        userId: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalAmount: number;
        country: import("@prisma/client").$Enums.Country;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
