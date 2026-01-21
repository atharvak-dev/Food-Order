import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Country } from '@prisma/client';

@Injectable()
export class RestaurantsService {
    constructor(private prisma: PrismaService) { }

    /**
     * Get all restaurants, filtered by country for non-admin users
     */
    async findAll(userCountry: Country | null) {
        const where = userCountry ? { country: userCountry } : {};

        return this.prisma.restaurant.findMany({
            where,
            include: {
                menuItems: true,
            },
            orderBy: { rating: 'desc' },
        });
    }

    /**
     * Get a single restaurant by ID
     * Returns null if user doesn't have access (country mismatch)
     */
    async findOne(id: string, userCountry: Country | null) {
        const restaurant = await this.prisma.restaurant.findUnique({
            where: { id },
            include: {
                menuItems: {
                    orderBy: { category: 'asc' },
                },
            },
        });

        // Check country access for non-admins
        if (restaurant && userCountry && restaurant.country !== userCountry) {
            return null;
        }

        return restaurant;
    }

    /**
     * Get menu items for a restaurant
     */
    async getMenuItems(restaurantId: string, userCountry: Country | null) {
        // First check if user has access to this restaurant
        const restaurant = await this.prisma.restaurant.findUnique({
            where: { id: restaurantId },
        });

        if (!restaurant) return [];
        if (userCountry && restaurant.country !== userCountry) return [];

        return this.prisma.menuItem.findMany({
            where: { restaurantId },
            orderBy: { category: 'asc' },
        });
    }

    /**
     * Get a menu item by ID
     */
    async getMenuItem(id: string) {
        return this.prisma.menuItem.findUnique({
            where: { id },
            include: { restaurant: true },
        });
    }

    /**
     * Search restaurants by name or cuisine
     */
    async search(query: string, userCountry: Country | null) {
        const where: any = {
            OR: [
                { name: { contains: query, mode: 'insensitive' } },
                { cuisine: { contains: query, mode: 'insensitive' } },
            ],
        };

        if (userCountry) {
            where.country = userCountry;
        }

        return this.prisma.restaurant.findMany({
            where,
            include: { menuItems: true },
        });
    }
}
