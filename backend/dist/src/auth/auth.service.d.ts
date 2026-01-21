import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginInput } from './dto/login.input';
import { User } from '@prisma/client';
export interface JwtPayload {
    sub: string;
    email: string;
    role: string;
    country: string | null;
}
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<User | null>;
    login(loginInput: LoginInput): Promise<{
        accessToken: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            country: import("@prisma/client").$Enums.Country | null;
            createdAt: Date;
        };
    }>;
    getUserById(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        country: import("@prisma/client").$Enums.Country | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    getAllUsers(): Promise<{
        id: string;
        name: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        country: import("@prisma/client").$Enums.Country | null;
        createdAt: Date;
    }[]>;
}
