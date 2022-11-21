import { MaxLength, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCategoryDTO {
    @MaxLength(50)
    name: string

    @MaxLength(100)
    @IsOptional()
    description: string
}

export class UpdateCategoryDTO extends PartialType(CreateCategoryDTO) {

}