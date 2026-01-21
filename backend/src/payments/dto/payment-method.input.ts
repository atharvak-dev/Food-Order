import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length, IsInt, Min, Max, IsOptional, IsBoolean } from 'class-validator';

@InputType()
export class CreatePaymentMethodInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    type: string; // 'credit_card', 'debit_card', 'upi', 'net_banking'

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    cardBrand?: string;

    @Field()
    @IsString()
    @Length(4, 4)
    lastFour: string;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(12)
    expiryMonth?: number;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    @Min(2024)
    expiryYear?: number;

    @Field({ defaultValue: false })
    @IsBoolean()
    isDefault: boolean;
}

@InputType()
export class UpdatePaymentMethodInput {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    cardBrand?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @Length(4, 4)
    lastFour?: string;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(12)
    expiryMonth?: number;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    @Min(2024)
    expiryYear?: number;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    isDefault?: boolean;
}
