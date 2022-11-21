import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductsService } from 'src/products/products.service';
import { ShoppingCartProductsService } from 'src/shopping-cart-products/shopping-cart-products.service';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';

@Module({
  imports: [PrismaModule],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService, ShoppingCartProductsService, ProductsService]
})
export class ShoppingCartModule { }
