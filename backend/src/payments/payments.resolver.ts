import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentMethod } from './models/payment-method.model';
import { CreatePaymentMethodInput, UpdatePaymentMethodInput } from './dto/payment-method.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '@prisma/client';

interface UserContext {
    id: string;
    email: string;
    role: string;
    country: string | null;
}

@Resolver(() => PaymentMethod)
@UseGuards(GqlAuthGuard)
export class PaymentsResolver {
    constructor(private paymentsService: PaymentsService) { }

    @Query(() => [PaymentMethod])
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    async paymentMethods() {
        return this.paymentsService.findAll();
    }

    @Query(() => [PaymentMethod])
    async myPaymentMethods(@CurrentUser() user: UserContext) {
        return this.paymentsService.findByUser(user.id);
    }

    @Query(() => PaymentMethod, { nullable: true })
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    async paymentMethod(@Args('id', { type: () => ID }) id: string) {
        return this.paymentsService.findOne(id);
    }

    @Mutation(() => PaymentMethod)
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    async createPaymentMethod(
        @Args('input') input: CreatePaymentMethodInput,
        @CurrentUser() user: UserContext,
    ) {
        return this.paymentsService.create(user.id, input);
    }

    @Mutation(() => PaymentMethod)
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    async updatePaymentMethod(
        @Args('id', { type: () => ID }) id: string,
        @Args('input') input: UpdatePaymentMethodInput,
    ) {
        return this.paymentsService.update(id, input);
    }

    @Mutation(() => Boolean)
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    async deletePaymentMethod(@Args('id', { type: () => ID }) id: string) {
        return this.paymentsService.delete(id);
    }

    @Mutation(() => PaymentMethod)
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    async setDefaultPaymentMethod(
        @Args('id', { type: () => ID }) id: string,
        @CurrentUser() user: UserContext,
    ) {
        return this.paymentsService.setDefault(id, user.id);
    }
}
