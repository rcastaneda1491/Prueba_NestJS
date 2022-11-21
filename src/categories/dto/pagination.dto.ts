import { IsInt, Max, Min } from "class-validator"

export class PaginationCategories {
    @IsInt()
    @Min(1)
    @Max(100)
    size: number = 10

    @IsInt()
    @Min(0)
    pageNumber: number = 0
}