import { MaxLength, IsOptional, IsBoolean, IsUUID, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateProductDTO {
    @MaxLength(50)
    name: string

    @MaxLength(100)
    @IsOptional()
    description: string

    @MaxLength(50)
    brand: string

    @IsNumber()
    price: number

    @IsBoolean()
    @IsOptional()
    active: boolean

    @IsUUID("4")
    @IsOptional()
    categoryId: string
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) { }