import { Country } from '@prisma/client';
import { MenuItem } from './menu-item.model';
export declare class Restaurant {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    cuisine: string;
    rating: number;
    country: Country;
    menuItems?: MenuItem[];
    createdAt: Date;
}
