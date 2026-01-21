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
exports.RestaurantsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RestaurantsService = class RestaurantsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(userCountry) {
        const where = userCountry ? { country: userCountry } : {};
        return this.prisma.restaurant.findMany({
            where,
            include: {
                menuItems: true,
            },
            orderBy: { rating: 'desc' },
        });
    }
    async findOne(id, userCountry) {
        const restaurant = await this.prisma.restaurant.findUnique({
            where: { id },
            include: {
                menuItems: {
                    orderBy: { category: 'asc' },
                },
            },
        });
        if (restaurant && userCountry && restaurant.country !== userCountry) {
            return null;
        }
        return restaurant;
    }
    async getMenuItems(restaurantId, userCountry) {
        const restaurant = await this.prisma.restaurant.findUnique({
            where: { id: restaurantId },
        });
        if (!restaurant)
            return [];
        if (userCountry && restaurant.country !== userCountry)
            return [];
        return this.prisma.menuItem.findMany({
            where: { restaurantId },
            orderBy: { category: 'asc' },
        });
    }
    async getMenuItem(id) {
        return this.prisma.menuItem.findUnique({
            where: { id },
            include: { restaurant: true },
        });
    }
    async search(query, userCountry) {
        const where = {
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
};
exports.RestaurantsService = RestaurantsService;
exports.RestaurantsService = RestaurantsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RestaurantsService);
//# sourceMappingURL=restaurants.service.js.map