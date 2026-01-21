import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './models/order.model';
import { CreateOrderInput, AddItemInput, UpdateItemQuantityInput, PlaceOrderInput } from './dto/order.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role, Country } from '@prisma/client';

interface UserContext {
    id: string;
    email: string;
    role: string;
    country: string | null;
}

@Resolver(() => Order)
@UseGuards(GqlAuthGuard)
export class OrdersResolver {
    constructor(private ordersService: OrdersService) { }

    @Query(() => [Order])
    async orders(@CurrentUser() user: UserContext) {
        return this.ordersService.findAll(
            user.id,
            user.role as Role,
            user.country as Country | null,
        );
    }

    @Query(() => Order, { nullable: true })
    async order(
        @Args('id', { type: () => ID }) id: string,
        @CurrentUser() user: UserContext,
    ) {
        return this.ordersService.findOne(
            id,
            user.id,
            user.role as Role,
            user.country as Country | null,
        );
    }

    @Query(() => Order, { nullable: true })
    async currentCart(@CurrentUser() user: UserContext) {
        return this.ordersService.getCurrentCart(user.id);
    }

    @Mutation(() => Order)
    async createOrder(
        @Args('input') input: CreateOrderInput,
        @CurrentUser() user: UserContext,
    ) {
        return this.ordersService.create(
            user.id,
            user.country as Country | null,
            input,
        );
    }

    @Mutation(() => Order)
    async addItemToOrder(
        @Args('input') input: AddItemInput,
        @CurrentUser() user: UserContext,
    ) {
        return this.ordersService.addItem(user.id, input);
    }

    @Mutation(() => Order)
    async updateOrderItemQuantity(
        @Args('input') input: UpdateItemQuantityInput,
        @CurrentUser() user: UserContext,
    ) {
        return this.ordersService.updateItemQuantity(user.id, input);
    }

    @Mutation(() => Order)
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN, Role.MANAGER)
    async placeOrder(
        @Args('input') input: PlaceOrderInput,
        @CurrentUser() user: UserContext,
    ) {
        return this.ordersService.placeOrder(user.id, user.role as Role, input);
    }

    @Mutation(() => Order)
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN, Role.MANAGER)
    async cancelOrder(
        @Args('orderId', { type: () => ID }) orderId: string,
        @CurrentUser() user: UserContext,
    ) {
        return this.ordersService.cancelOrder(
            orderId,
            user.id,
            user.role as Role,
            user.country as Country | null,
        );
    }
}
