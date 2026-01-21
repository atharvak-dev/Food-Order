import { PrismaService } from '../prisma/prisma.service';
import { Country, Role } from '@prisma/client';
import { CreateOrderInput, AddItemInput, UpdateItemQuantityInput, PlaceOrderInput } from './dto/order.input';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(userId: string, userRole: Role, userCountry: Country | null): Promise<({
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
    findOne(id: string, userId: string, userRole: Role, userCountry: Country | null): Promise<({
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
    create(userId: string, userCountry: Country | null, input: CreateOrderInput): Promise<{
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
    addItem(userId: string, input: AddItemInput): Promise<{
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
    updateItemQuantity(userId: string, input: UpdateItemQuantityInput): Promise<{
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
    placeOrder(userId: string, userRole: Role, input: PlaceOrderInput): Promise<{
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
    cancelOrder(orderId: string, userId: string, userRole: Role, userCountry: Country | null): Promise<{
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
    getCurrentCart(userId: string): Promise<({
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
    private recalculateTotal;
}
