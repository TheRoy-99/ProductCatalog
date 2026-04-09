import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module'; // Importación vital
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [AuthModule, ProductsModule, CategoriesModule], // Registramos ambos módulos aquí
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
