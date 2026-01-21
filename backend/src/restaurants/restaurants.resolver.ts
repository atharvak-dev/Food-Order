import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './models/restaurant.model';
import { MenuItem } from './models/menu-item.model';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Country } from '@prisma/client';

interface UserContext {
    id: string;
    email: string;
    role: string;
    country: string | null;
}

@Resolver(() => Restaurant)
export class RestaurantsResolver {
    constructor(private restaurantsService: RestaurantsService) { }

    @Query(() => [Restaurant])
    @UseGuards(GqlAuthGuard)
    async restaurants(@CurrentUser() user: UserContext) {
        const userCountry = user.country as Country | null;
        return this.restaurantsService.findAll(userCountry);
    }

    @Query(() => Restaurant, { nullable: true })
    @UseGuards(GqlAuthGuard)
    async restaurant(
        @Args('id', { type: () => ID }) id: string,
        @CurrentUser() user: UserContext,
    ) {
        const userCountry = user.country as Country | null;
        return this.restaurantsService.findOne(id, userCountry);
    }

    @Query(() => [MenuItem])
    @UseGuards(GqlAuthGuard)
    async menuItems(
        @Args('restaurantId', { type: () => ID }) restaurantId: string,
        @CurrentUser() user: UserContext,
    ) {
        const userCountry = user.country as Country | null;
        return this.restaurantsService.getMenuItems(restaurantId, userCountry);
    }

    @Query(() => MenuItem, { nullable: true })
    @UseGuards(GqlAuthGuard)
    async menuItem(@Args('id', { type: () => ID }) id: string) {
        return this.restaurantsService.getMenuItem(id);
    }

    @Query(() => [Restaurant])
    @UseGuards(GqlAuthGuard)
    async searchRestaurants(
        @Args('query') query: string,
        @CurrentUser() user: UserContext,
    ) {
        const userCountry = user.country as Country | null;
        return this.restaurantsService.search(query, userCountry);
    }
}
