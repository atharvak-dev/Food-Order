import { RestaurantsService } from './restaurants.service';
interface UserContext {
    id: string;
    email: string;
    role: string;
    country: string | null;
}
export declare class RestaurantsResolver {
    private restaurantsService;
    constructor(restaurantsService: RestaurantsService);
    restaurants(user: UserContext): Promise<({
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
    restaurant(id: string, user: UserContext): Promise<({
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
    menuItems(restaurantId: string, user: UserContext): Promise<{
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
    menuItem(id: string): Promise<({
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
    searchRestaurants(query: string, user: UserContext): Promise<({
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
export {};
