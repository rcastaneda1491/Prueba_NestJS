import { MaxLength, MinLength } from "class-validator"

export class SignInUserDTO {
    @MaxLength(50)
    @MinLength(3)
    names: string

    @MinLength(3)
    @MaxLength(50)
    lastNames: string
}

