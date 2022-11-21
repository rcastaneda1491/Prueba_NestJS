import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) { }
  getCategories(size: number, pageNumber: number) {
    return this.prismaService.category.findMany({ include: { products: true }, take: size, skip: pageNumber * size });
  }

  createCategory(data: Prisma.CategoryCreateInput) {
    return this.prismaService.category.create({ data });
  }

  deleteCategory(id: string) {
    return this.prismaService.category.delete({ where: { id } })
  }

  updateCategory(data: Prisma.CategoryUpdateInput, id: string) {
    return this.prismaService.category.update({ data, where: { id } });
  }
}
