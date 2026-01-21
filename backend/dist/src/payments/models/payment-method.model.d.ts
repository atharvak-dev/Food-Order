export declare class PaymentMethod {
    id: string;
    userId: string;
    type: string;
    cardBrand?: string;
    lastFour: string;
    expiryMonth?: number;
    expiryYear?: number;
    isDefault: boolean;
    createdAt: Date;
}
