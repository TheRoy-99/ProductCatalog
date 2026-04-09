import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany({
      orderBy: { name: 'asc' }
    });
  }

  async create(data: any) {
    return this.prisma.category.create({
      data: {
        name: data.name,
        // Si tienes más campos en tu modelo, agrégalos aquí
      },
    });
  }
}