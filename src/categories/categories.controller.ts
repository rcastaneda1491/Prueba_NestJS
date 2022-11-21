import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO, UpdateCategoryDTO } from './dto/create-or-update.dto';
import { PaginationCategories } from './dto/pagination.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Get()
  getCategories(@Query() { size, pageNumber }: PaginationCategories) {
    return this.categoriesService.getCategories(size, pageNumber);
  }

  @Post()
  createCategory(@Body() category: CreateCategoryDTO) {
    return this.categoriesService.createCategory(category);
  }

  @Delete(":id")
  async deleteCategory(@Param("id") id: string) {
    try {
      return await this.categoriesService.deleteCategory(id);
    } catch (e) {
      switch (e.code) {
        case "P2025":
          throw new NotFoundException('No se encontró la categoría');
      }
      throw e;
    }
  }

  @Put(":id")
  async updateCategory(@Body() category: UpdateCategoryDTO, @Param("id") id: string) {
    try {
      return await this.categoriesService.updateCategory(category, id);
    } catch (e) {
      switch (e.code) {
        case "P2025":
          throw new NotFoundException('No se encontró la categoría');
      }
      throw e;
    }
  }
}
