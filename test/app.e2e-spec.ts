import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('DELETE /products/:id returns 400 for invalid UUID', () => {
    return request(app.getHttpServer())
      .delete('/products/not-a-uuid')
      .expect(400);
  });

  it('DELETE /products/:id returns 404 for non-existent product', () => {
    return request(app.getHttpServer())
      .delete('/products/00000000-0000-0000-0000-000000000000')
      .expect(404);
  });

  it('DELETE /categories/:id returns 400 for invalid UUID', () => {
    return request(app.getHttpServer())
      .delete('/categories/not-a-uuid')
      .expect(400);
  });

  it('DELETE /categories/:id returns 404 for non-existent category', () => {
    return request(app.getHttpServer())
      .delete('/categories/00000000-0000-0000-0000-000000000000')
      .expect(404);
  });
});
