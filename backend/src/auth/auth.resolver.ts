import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User, AuthPayload } from './models/user.model';
import { LoginInput } from './dto/login.input';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@Resolver(() => User)
export class AuthResolver {
    constructor(private authService: AuthService) { }

    @Mutation(() => AuthPayload)
    async login(@Args('loginInput') loginInput: LoginInput) {
        return this.authService.login(loginInput);
    }

    @Query(() => User)
    @UseGuards(GqlAuthGuard)
    async me(@CurrentUser() user: { id: string; email: string; role: string; country: string | null }) {
        return this.authService.getUserById(user.id);
    }

    @Query(() => [User])
    async users() {
        return this.authService.getAllUsers();
    }
}
