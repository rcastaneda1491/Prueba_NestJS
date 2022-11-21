import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ShoppingCartProductsController } from './shopping-cart-products.controller';
import { ShoppingCartProductsService } from './shopping-cart-products.service';

@Module({
  imports: [PrismaModule],
  controllers: [ShoppingCartProductsController],
  providers: [ShoppingCartProductsService]
})
export class ShoppingCartProductsModule { }
