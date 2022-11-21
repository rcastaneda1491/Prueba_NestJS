import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
//import { Prisma } from '@prisma/client';


@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) { }

  getProducts(size: number, cursor: string) {
    return this.prismaService.product.findMany({ include: { category: true }, take: size, cursor: cursor && { id: cursor }, skip: cursor ? 1 : 0, orderBy: { id: "asc" } });
  }

  getProductById(id: string) {
    return this.prismaService.product.findUnique({ where: { id } });
  }

  createProduct(data: Prisma.ProductCreateInput) {
    return this.prismaService.product.create({ data });
  }

  deleteProduct(id: string) {
    return this.prismaService.product.delete({ where: { id } })
  }

  updateProduct(data: Prisma.ProductUpdateInput, id: string) {
    return this.prismaService.product.update({ data, where: { id } });
  }
}
