import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return await this.prisma.product.create({
      data: {
        name: data.name,
        productNumber: data.productNumber,
        color: data.color,
        // Convertimos a número por seguridad
        standardPrice: Number(data.standardPrice),
        listPrice: Number(data.listPrice),
        size: data.size,
        weight: data.weight,
        status: data.status,
        categoryId: data.categoryId,
        // CONVERSIÓN DE FECHAS: Vital para que Prisma no explote
        saleStartDate: data.saleStartDate
          ? new Date(data.saleStartDate)
          : new Date(),
        saleEndDate: data.saleEndDate ? new Date(data.saleEndDate) : null,
      },
    });
  }

  async findAll() {
    return await this.prisma.product.findMany({
      include: {
        category: true,
      },
    });
  }

  async remove(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException(`Product with id ${id} not found`);
    return this.prisma.product.delete({ where: { id } });
  }
}
