import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    console.log('Petición GET recibida en /categories');
    return this.categoriesService.findAll();
  }

  @Post()
  create(@Body() data: any) {
    console.log('Petición POST recibida en /categories', data);
    return this.categoriesService.create(data);
  }
}