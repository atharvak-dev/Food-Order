export declare class OrderItemInput {
    menuItemId: string;
    quantity: number;
}
export declare class CreateOrderInput {
    items: OrderItemInput[];
}
export declare class AddItemInput {
    orderId: string;
    menuItemId: string;
    quantity: number;
}
export declare class UpdateItemQuantityInput {
    orderItemId: string;
    quantity: number;
}
export declare class PlaceOrderInput {
    orderId: string;
    paymentMethodId?: string;
}
