export declare class CreatePaymentMethodInput {
    type: string;
    cardBrand?: string;
    lastFour: string;
    expiryMonth?: number;
    expiryYear?: number;
    isDefault: boolean;
}
export declare class UpdatePaymentMethodInput {
    cardBrand?: string;
    lastFour?: string;
    expiryMonth?: number;
    expiryYear?: number;
    isDefault?: boolean;
}
