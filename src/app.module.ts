import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { ShoppingCartProductsModule } from './shopping-cart-products/shopping-cart-products.module';

@Module({
  imports: [ProductsModule, CategoriesModule, PrismaModule, UsersModule, AuthenticationModule, ShoppingCartModule, ShoppingCartProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
