import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Country } from '@prisma/client';
import { MenuItem } from './menu-item.model';

@ObjectType()
export class Restaurant {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    imageUrl: string;

    @Field()
    cuisine: string;

    @Field(() => Float)
    rating: number;

    @Field(() => Country)
    country: Country;

    @Field(() => [MenuItem], { nullable: true })
    menuItems?: MenuItem[];

    @Field()
    createdAt: Date;
}
