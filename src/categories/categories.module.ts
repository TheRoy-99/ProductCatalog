import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaService } from '../prisma.service'; // <--- Importante: verifica la ruta

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService], // <--- Agrega PrismaService aquí
})
export class CategoriesModule {}