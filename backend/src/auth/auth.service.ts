import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginInput } from './dto/login.input';
import { User } from '@prisma/client';

export interface JwtPayload {
    sub: string;
    email: string;
    role: string;
    country: string | null;
}

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }

    async login(loginInput: LoginInput) {
        const user = await this.validateUser(loginInput.email, loginInput.password);

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const payload: JwtPayload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            country: user.country,
        };

        return {
            accessToken: this.jwtService.sign(payload),
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                country: user.country,
                createdAt: user.createdAt,
            },
        };
    }

    async getUserById(id: string) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async getAllUsers() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                country: true,
                createdAt: true,
            },
        });
    }
}
