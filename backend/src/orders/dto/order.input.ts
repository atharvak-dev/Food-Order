import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { IsUUID, IsInt, Min, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class OrderItemInput {
    @Field(() => ID)
    @IsUUID()
    menuItemId: string;

    @Field(() => Int)
    @IsInt()
    @Min(1)
    quantity: number;
}

@InputType()
export class CreateOrderInput {
    @Field(() => [OrderItemInput])
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemInput)
    items: OrderItemInput[];
}

@InputType()
export class AddItemInput {
    @Field(() => ID)
    @IsUUID()
    orderId: string;

    @Field(() => ID)
    @IsUUID()
    menuItemId: string;

    @Field(() => Int)
    @IsInt()
    @Min(1)
    quantity: number;
}

@InputType()
export class UpdateItemQuantityInput {
    @Field(() => ID)
    @IsUUID()
    orderItemId: string;

    @Field(() => Int)
    @IsInt()
    @Min(0)
    quantity: number;
}

@InputType()
export class PlaceOrderInput {
    @Field(() => ID)
    @IsUUID()
    orderId: string;

    @Field(() => ID, { nullable: true })
    paymentMethodId?: string;
}
