import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    // Usamos await para que el método sea genuinamente asíncrono
    return await this.prisma.product.create({
      data: {
        ...createProductDto,
        // Conversión manual obligatoria para que Prisma no falle
        saleStartDate: new Date(createProductDto.saleStartDate),
        saleEndDate: createProductDto.saleEndDate
          ? new Date(createProductDto.saleEndDate)
          : null,
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
}
