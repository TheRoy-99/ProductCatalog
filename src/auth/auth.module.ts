import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthGuard } from './auth.guard'; // <--- IMPORTANTE: Importar el guardia que creamos

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: 'CLAVE_SECRETA_MATEO_2026',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    PrismaService, 
    AuthGuard // <--- AGREGAR AQUÍ: Para que NestJS pueda inyectarlo
  ],
  exports: [AuthService, AuthGuard], // <--- AGREGAR AQUÍ: Para que otros módulos lo usen
})
export class AuthModule {}