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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PaymentsService = class PaymentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.paymentMethod.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async findByUser(userId) {
        return this.prisma.paymentMethod.findMany({
            where: { userId },
            orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
        });
    }
    async findOne(id) {
        return this.prisma.paymentMethod.findUnique({
            where: { id },
        });
    }
    async create(userId, input) {
        if (input.isDefault) {
            await this.prisma.paymentMethod.updateMany({
                where: { userId, isDefault: true },
                data: { isDefault: false },
            });
        }
        return this.prisma.paymentMethod.create({
            data: {
                userId,
                ...input,
            },
        });
    }
    async update(id, input) {
        const existing = await this.prisma.paymentMethod.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Payment method not found');
        }
        if (input.isDefault) {
            await this.prisma.paymentMethod.updateMany({
                where: { userId: existing.userId, isDefault: true },
                data: { isDefault: false },
            });
        }
        return this.prisma.paymentMethod.update({
            where: { id },
            data: input,
        });
    }
    async delete(id) {
        const existing = await this.prisma.paymentMethod.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Payment method not found');
        }
        await this.prisma.paymentMethod.delete({ where: { id } });
        return true;
    }
    async setDefault(id, userId) {
        const existing = await this.prisma.paymentMethod.findUnique({
            where: { id },
        });
        if (!existing || existing.userId !== userId) {
            throw new common_1.NotFoundException('Payment method not found');
        }
        await this.prisma.paymentMethod.updateMany({
            where: { userId, isDefault: true },
            data: { isDefault: false },
        });
        return this.prisma.paymentMethod.update({
            where: { id },
            data: { isDefault: true },
        });
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map