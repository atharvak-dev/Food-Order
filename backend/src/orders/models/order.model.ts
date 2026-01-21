import { ObjectType, Field, ID, Float, registerEnumType } from '@nestjs/graphql';
import { OrderStatus, Country } from '@prisma/client';
import { OrderItem } from './order-item.model';

registerEnumType(OrderStatus, {
    name: 'OrderStatus',
    description: 'Order status',
});

@ObjectType()
export class Order {
    @Field(() => ID)
    id: string;

    @Field()
    userId: string;

    @Field(() => OrderStatus)
    status: OrderStatus;

    @Field(() => Float)
    totalAmount: number;

    @Field(() => Country)
    country: Country;

    @Field(() => [OrderItem], { nullable: true })
    items?: OrderItem[];

    @Field({ nullable: true })
    paymentMethodId?: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
