import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthenticationService {
    constructor(private readonly prismaService: PrismaService) { }
    signIn() {
        return;
    }

    signUp(data: Prisma.AuthenticationCreateInput) {
        return this.prismaService.authentication.create({ data, select: { id: true, email: true, createdAt: true, updatedAt: true, active: true, user: { include: { shoppingCart: true } } } });
    }

    findUserByEmail(email: string) {
        return this.prismaService.authentication.findUnique({ where: { email } })
    }

    async encryptPassword(passwordToEncrypt: string) {
        const salt = await genSalt(10);
        return await hash(passwordToEncrypt, salt);
    }

    async compareEncryptedPassword() {
        return;
    }
}
