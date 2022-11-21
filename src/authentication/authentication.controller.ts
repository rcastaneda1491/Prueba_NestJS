import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ParentSignInDTO } from './dto/signIn/parent.dto';

@Controller('authentication')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) { }


    @Post('signIn')
    signIn(@Body() { signInUserDTO, signInAuthenticationDTO }: ParentSignInDTO) {
        return;
    }

    @Post('signUp')
    async signUp(@Body() { signInUserDTO, signInAuthenticationDTO }: ParentSignInDTO) {
        const userFinded = await this.authenticationService.findUserByEmail(signInAuthenticationDTO.email);

        if (userFinded) {
            throw new BadRequestException('El correo ingresado ya existe');
        }

        const passwordEncrypted = await this.authenticationService.encryptPassword(signInAuthenticationDTO.password);
        signInAuthenticationDTO.password = passwordEncrypted;
        return this.authenticationService.signUp({ user: { create: { shoppingCart: { create: {} }, ...signInUserDTO } }, ...signInAuthenticationDTO });
    }
}
