import { PaymentsService } from './payments.service';
import { CreatePaymentMethodInput, UpdatePaymentMethodInput } from './dto/payment-method.input';
interface UserContext {
    id: string;
    email: string;
    role: string;
    country: string | null;
}
export declare class PaymentsResolver {
    private paymentsService;
    constructor(paymentsService: PaymentsService);
    paymentMethods(): Promise<{
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
    myPaymentMethods(user: UserContext): Promise<{
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
    paymentMethod(id: string): Promise<{
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
    createPaymentMethod(input: CreatePaymentMethodInput, user: UserContext): Promise<{
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
    updatePaymentMethod(id: string, input: UpdatePaymentMethodInput): Promise<{
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
    deletePaymentMethod(id: string): Promise<boolean>;
    setDefaultPaymentMethod(id: string, user: UserContext): Promise<{
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
export {};
