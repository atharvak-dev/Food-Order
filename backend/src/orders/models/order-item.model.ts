import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { MenuItem } from '../../restaurants/models/menu-item.model';

@ObjectType()
export class OrderItem {
    @Field(() => ID)
    id: string;

    @Field()
    orderId: string;

    @Field()
    menuItemId: string;

    @Field(() => Int)
    quantity: number;

    @Field(() => Float)
    price: number;

    @Field(() => MenuItem, { nullable: true })
    menuItem?: MenuItem;

    @Field()
    createdAt: Date;
}
