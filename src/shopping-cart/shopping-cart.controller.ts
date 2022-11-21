import { Body, Controller, Get, Param, Post, BadRequestException } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { ShoppingCartProductsService } from 'src/shopping-cart-products/shopping-cart-products.service';
import { SetShoppingCartProduct } from './dto/set-shopping-cart-product.dto';
import { ShoppingCartService } from './shopping-cart.service';

@Controller('shopping-cart')
export class ShoppingCartController {
    constructor(private readonly shoppingCartService: ShoppingCartService, private readonly shoppingCartProductsService: ShoppingCartProductsService, private readonly productsService: ProductsService) { }

    @Get(":id")
    getShoppingCartByUserId(@Param("id") userId: string) {
        return this.shoppingCartService.getShoppingCartByUserId(userId);
    }

    @Post()
    async setProductQuantity(@Body() shoppingCartProduct: SetShoppingCartProduct) {
        const product = await this.productsService.getProductById(shoppingCartProduct.productId);
        if (product) {
            const currentShoppingCart = await this.shoppingCartService.getShoppingCartByUserId(shoppingCartProduct.userId);
            const currentShoppingCartProduct = await this.shoppingCartProductsService.getShoppingCartProductByProduct(shoppingCartProduct.productId, currentShoppingCart.id);

            if (!currentShoppingCartProduct && shoppingCartProduct.quantity === 0) {
                throw new BadRequestException('El producto no se puede agregar con cantidad 0');
            }
            return this.shoppingCartService.setProductQuantity(shoppingCartProduct.userId, product, shoppingCartProduct.quantity, currentShoppingCartProduct, currentShoppingCart);
        } else {
            throw new BadRequestException('El producto que ingresó no existe');
        }
    }

}
