import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(search?: string) {
    return this.prisma.product.findMany({
      where: search ? {
        name: { contains: search, mode: 'insensitive' }
      } : {},
      include: {
        category: true // Trae la info de la categoría de DBeaver
      }
    });
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: id }
    });

    if (!product) {
      throw new NotFoundException(`Producto ${id} no encontrado`);
    }
    return product;
  }

  // Métodos extra para que no te de error el controller
  async create(data: any) { return this.prisma.product.create({ data }); }
  async update(id: string, data: any) { return this.prisma.product.update({ where: { id }, data }); }
  async remove(id: string) { return this.prisma.product.delete({ where: { id } }); }
}