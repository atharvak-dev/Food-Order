import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class PaymentMethod {
    @Field(() => ID)
    id: string;

    @Field()
    userId: string;

    @Field()
    type: string;

    @Field({ nullable: true })
    cardBrand?: string;

    @Field()
    lastFour: string;

    @Field(() => Int, { nullable: true })
    expiryMonth?: number;

    @Field(() => Int, { nullable: true })
    expiryYear?: number;

    @Field()
    isDefault: boolean;

    @Field()
    createdAt: Date;
}
