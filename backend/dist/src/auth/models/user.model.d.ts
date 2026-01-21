import { Role, Country } from '@prisma/client';
export declare class User {
    id: string;
    name: string;
    email: string;
    role: Role;
    country: Country | null;
    createdAt: Date;
}
export declare class AuthPayload {
    accessToken: string;
    user: User;
}
