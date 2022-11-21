import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { CreateProductDTO, UpdateProductDTO } from './dto/create-or-update-product.dto';
import { PaginationProducts } from './dto/pagination.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  getProducts(@Query() { size, cursor }: PaginationProducts) {
    return this.productsService.getProducts(size, cursor);
  }

  @Post()
  createProduct(@Body() product: CreateProductDTO) {
    return this.productsService.createProduct(product);
  }

  @Delete(":id")
  async deleteProduct(@Param("id") id: string) {
    try {
      return await this.productsService.deleteProduct(id);
    } catch (e) {
      switch (e.code) {
        case "P2025":
          throw new NotFoundException('No se encontró el producto');
      }
      throw e;
    }
  }

  @Put(":id")
  async updateCategory(@Body() product: UpdateProductDTO, @Param("id") id: string) {
    try {
      return await this.productsService.updateProduct(product, id);
    } catch (e) {
      switch (e.code) {
        case "P2025":
          throw new NotFoundException('No se encontró el producto');
      }
      throw e;
    }
  }
}
