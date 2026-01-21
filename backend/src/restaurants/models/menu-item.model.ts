import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class MenuItem {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field(() => Float)
    price: number;

    @Field()
    imageUrl: string;

    @Field()
    category: string;

    @Field()
    isVegetarian: boolean;

    @Field()
    restaurantId: string;

    @Field()
    createdAt: Date;
}
