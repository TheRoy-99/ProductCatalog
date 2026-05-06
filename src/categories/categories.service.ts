import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async create(data: any) {
    return this.prisma.category.create({
      data: {
        name: data.name,
      },
    });
  }

  async update(id: string, data: any) {
  return await this.prisma.category.update({
    where: { id },
    data: {
      name: data.name,
      // Si llega "none" o vacío, debe ser null para Prisma
      parentId: (data.parentId === 'none' || !data.parentId) ? null : data.parentId,
    },
  });
}

  async remove(id: string) {
    // Verificamos si hay productos usando esta categoría para evitar errores de integridad
    const productsCount = await this.prisma.product.count({
      where: { categoryId: id },
    });

    if (productsCount > 0) {
      throw new ConflictException(
        'No se puede eliminar la categoría porque tiene productos asociados.'
      );
    }

    return await this.prisma.category.delete({ where: { id } });
  }
}
