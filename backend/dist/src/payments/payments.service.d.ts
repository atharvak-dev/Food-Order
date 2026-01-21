import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentMethodInput, UpdatePaymentMethodInput } from './dto/payment-method.input';
export declare class PaymentsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: string;
        cardBrand: string | null;
        lastFour: string;
        expiryMonth: number | null;
        expiryYear: number | null;
        isDefault: boolean;
    }[]>;
    findByUser(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: string;
        cardBrand: string | null;
        lastFour: string;
        expiryMonth: number | null;
        expiryYear: number | null;
        isDefault: boolean;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: string;
        cardBrand: string | null;
        lastFour: string;
        expiryMonth: number | null;
        expiryYear: number | null;
        isDefault: boolean;
    } | null>;
    create(userId: string, input: CreatePaymentMethodInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: string;
        cardBrand: string | null;
        lastFour: string;
        expiryMonth: number | null;
        expiryYear: number | null;
        isDefault: boolean;
    }>;
    update(id: string, input: UpdatePaymentMethodInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: string;
        cardBrand: string | null;
        lastFour: string;
        expiryMonth: number | null;
        expiryYear: number | null;
        isDefault: boolean;
    }>;
    delete(id: string): Promise<boolean>;
    setDefault(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: string;
        cardBrand: string | null;
        lastFour: string;
        expiryMonth: number | null;
        expiryYear: number | null;
        isDefault: boolean;
    }>;
}
