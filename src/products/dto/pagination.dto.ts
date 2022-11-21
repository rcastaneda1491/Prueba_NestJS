import { IsInt, IsOptional, IsUUID, Max, Min } from "class-validator";

export class PaginationProducts {
    @IsInt()
    @Min(1)
    @Max(100)
    size: number = 10

    @IsUUID("4")
    @IsOptional()
    cursor: string
}