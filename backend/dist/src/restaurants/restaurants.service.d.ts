import { PrismaService } from '../prisma/prisma.service';
import { Country } from '@prisma/client';
export declare class RestaurantsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(userCountry: Country | null): Promise<({
        menuItems: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            imageUrl: string;
            price: number;
            category: string;
            isVegetarian: boolean;
            restaurantId: string;
        }[];
    } & {
        id: string;
        name: string;
        country: import("@prisma/client").$Enums.Country;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        imageUrl: string;
        cuisine: string;
        rating: number;
    })[]>;
    findOne(id: string, userCountry: Country | null): Promise<({
        menuItems: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            imageUrl: string;
            price: number;
            category: string;
            isVegetarian: boolean;
            restaurantId: string;
        }[];
    } & {
        id: string;
        name: string;
        country: import("@prisma/client").$Enums.Country;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        imageUrl: string;
        cuisine: string;
        rating: number;
    }) | null>;
    getMenuItems(restaurantId: string, userCountry: Country | null): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        imageUrl: string;
        price: number;
        category: string;
        isVegetarian: boolean;
        restaurantId: string;
    }[]>;
    getMenuItem(id: string): Promise<({
        restaurant: {
            id: string;
            name: string;
            country: import("@prisma/client").$Enums.Country;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            imageUrl: string;
            cuisine: string;
            rating: number;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        imageUrl: string;
        price: number;
        category: string;
        isVegetarian: boolean;
        restaurantId: string;
    }) | null>;
    search(query: string, userCountry: Country | null): Promise<({
        menuItems: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            imageUrl: string;
            price: number;
            category: string;
            isVegetarian: boolean;
            restaurantId: string;
        }[];
    } & {
        id: string;
        name: string;
        country: import("@prisma/client").$Enums.Country;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        imageUrl: string;
        cuisine: string;
        rating: number;
    })[]>;
}
