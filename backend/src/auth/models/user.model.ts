import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Role, Country } from '@prisma/client';

// Register Prisma enums with GraphQL
registerEnumType(Role, {
    name: 'Role',
    description: 'User roles for RBAC',
});

registerEnumType(Country, {
    name: 'Country',
    description: 'Country for location-based access',
});

@ObjectType()
export class User {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    email: string;

    @Field(() => Role)
    role: Role;

    @Field(() => Country, { nullable: true })
    country: Country | null;

    @Field()
    createdAt: Date;
}

@ObjectType()
export class AuthPayload {
    @Field()
    accessToken: string;

    @Field(() => User)
    user: User;
}
