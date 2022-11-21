import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShoppingCartProductsService {
    constructor(private readonly prismaService: PrismaService) { }

    getShoppingCartProductByProduct(productId: string, shoppingCartId: string) {
        return this.prismaService.shoppingCartProducts.findUnique({ where: { productId_shoppingCartId: { productId, shoppingCartId } }, include: { product: true } });
    }
}
