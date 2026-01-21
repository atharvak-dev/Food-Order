import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentMethodInput, UpdatePaymentMethodInput } from './dto/payment-method.input';

@Injectable()
export class PaymentsService {
    constructor(private prisma: PrismaService) { }

    /**
     * Get all payment methods (Admin only in production)
     */
    async findAll() {
        return this.prisma.paymentMethod.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    /**
     * Get payment methods for a specific user
     */
    async findByUser(userId: string) {
        return this.prisma.paymentMethod.findMany({
            where: { userId },
            orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
        });
    }

    /**
     * Get a single payment method
     */
    async findOne(id: string) {
        return this.prisma.paymentMethod.findUnique({
            where: { id },
        });
    }

    /**
     * Create a new payment method
     */
    async create(userId: string, input: CreatePaymentMethodInput) {
        // If this is set as default, unset other defaults
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

    /**
     * Update a payment method
     */
    async update(id: string, input: UpdatePaymentMethodInput) {
        const existing = await this.prisma.paymentMethod.findUnique({
            where: { id },
        });

        if (!existing) {
            throw new NotFoundException('Payment method not found');
        }

        // If setting as default, unset other defaults
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

    /**
     * Delete a payment method
     */
    async delete(id: string) {
        const existing = await this.prisma.paymentMethod.findUnique({
            where: { id },
        });

        if (!existing) {
            throw new NotFoundException('Payment method not found');
        }

        await this.prisma.paymentMethod.delete({ where: { id } });
        return true;
    }

    /**
     * Set a payment method as default
     */
    async setDefault(id: string, userId: string) {
        const existing = await this.prisma.paymentMethod.findUnique({
            where: { id },
        });

        if (!existing || existing.userId !== userId) {
            throw new NotFoundException('Payment method not found');
        }

        // Unset current default
        await this.prisma.paymentMethod.updateMany({
            where: { userId, isDefault: true },
            data: { isDefault: false },
        });

        // Set new default
        return this.prisma.paymentMethod.update({
            where: { id },
            data: { isDefault: true },
        });
    }
}
