import { MenuItem } from '../../restaurants/models/menu-item.model';
export declare class OrderItem {
    id: string;
    orderId: string;
    menuItemId: string;
    quantity: number;
    price: number;
    menuItem?: MenuItem;
    createdAt: Date;
}
