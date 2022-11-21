import { IsEmail, MaxLength, MinLength } from "class-validator"

export class SignInAuthenticationDTO {
    @MaxLength(50)
    @IsEmail()
    email: string

    @MaxLength(50)
    @MinLength(8)
    password: string
}
