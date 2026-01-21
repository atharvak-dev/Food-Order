import { OrderStatus, Country } from '@prisma/client';
import { OrderItem } from './order-item.model';
export declare class Order {
    id: string;
    userId: string;
    status: OrderStatus;
    totalAmount: number;
    country: Country;
    items?: OrderItem[];
    paymentMethodId?: string;
    createdAt: Date;
    updatedAt: Date;
}
