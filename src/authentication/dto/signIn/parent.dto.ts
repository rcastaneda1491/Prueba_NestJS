import { Type } from "class-transformer"
import { ValidateNested } from "class-validator"
import { SignInAuthenticationDTO } from "./sign-in-authentication.dto"
import { SignInUserDTO } from "./sign-in-user.dto"

export class ParentSignInDTO {
    @ValidateNested()
    @Type(() => SignInUserDTO)
    signInUserDTO: SignInUserDTO

    @ValidateNested()
    @Type(() => SignInAuthenticationDTO)
    signInAuthenticationDTO: SignInAuthenticationDTO
}
