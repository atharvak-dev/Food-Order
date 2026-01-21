import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
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
    me(user: {
        id: string;
        email: string;
        role: string;
        country: string | null;
    }): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        country: import("@prisma/client").$Enums.Country | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    users(): Promise<{
        id: string;
        name: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        country: import("@prisma/client").$Enums.Country | null;
        createdAt: Date;
    }[]>;
}
