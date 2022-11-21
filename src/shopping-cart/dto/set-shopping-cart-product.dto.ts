import { IsUUID, IsInt, Min, Max } from 'class-validator';

export class SetShoppingCartProduct {
    @IsUUID()
    userId: string

    @IsUUID()
    productId: string

    @IsInt()
    @Min(0)
    @Max(1000)
    quantity: number
}
