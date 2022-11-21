import { Injectable } from '@nestjs/common';
import { Prisma, ShoppingCart, ShoppingCartProducts, Product } from '@prisma/client';
import { keyBy, values } from 'lodash';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShoppingCartService {
    constructor(private readonly prismaService: PrismaService) { }

    getShoppingCartByUserId(userId: string) {
        return this.prismaService.shoppingCart.findUnique({ where: { userId }, include: { shoppingCartProducts: { include: { product: true } } } });
    }

    createShoppingCart(data: Prisma.ShoppingCartCreateInput) {
        return this.prismaService.shoppingCart.create({ data });
    }

    updateShoppingCart(data: Prisma.ShoppingCartUpdateInput, userId: string) {
        return this.prismaService.shoppingCart.update({ data, where: { userId } });
    }

    async setProductQuantity(userId: string, product: Product, quantity: number, currentShoppingCartProduct: ShoppingCartProducts & { product: Product }, currentShoppingCart: ShoppingCart & { shoppingCartProducts: (ShoppingCartProducts & { product: Product })[] }) {

        const productsByProductId = keyBy(currentShoppingCart.shoppingCartProducts, ({ productId }) => productId);
        productsByProductId[product.id] = { ...currentShoppingCartProduct, product, quantity };
        let total = values(productsByProductId).map(({ quantity, product: { price } }) => quantity * price).reduce((prev, curr) => prev + curr, 0);

        if (!currentShoppingCartProduct) {
            return this.updateShoppingCart({ shoppingCartProducts: { connectOrCreate: { create: { productId: product.id, quantity }, where: { productId_shoppingCartId: { productId: product.id, shoppingCartId: currentShoppingCart.id } } } }, total }, userId);
        }

        if (quantity === 0) {
            total = currentShoppingCart.total - (currentShoppingCartProduct.quantity * currentShoppingCartProduct.product.price);
            return this.updateShoppingCart({ shoppingCartProducts: { delete: { id: currentShoppingCartProduct.id } }, total }, userId);
        }

        return this.updateShoppingCart({ shoppingCartProducts: { update: { where: { id: currentShoppingCartProduct.id }, data: { quantity } } }, total }, userId);
    }
}
