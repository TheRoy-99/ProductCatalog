import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(loginDto: LoginDto) {
    // Buscamos el usuario en la tabla User de PostgreSQL
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email.toLowerCase() },
    });

    // Si no existe o la clave no coincide, lanzamos error 401
    if (!user || user.password !== loginDto.password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Quitamos el password del objeto antes de enviarlo al front por seguridad
    const { password, ...result } = user;
    return result;
  }
  
  async register(registerDto: RegisterDto) {
    // Verificamos si el email ya está registrado
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email.toLowerCase() },
    });

    if (existingUser) {
      throw new UnauthorizedException('El email ya esta registrado');
    }

    // Creamos el nuevo usuario
    const newUser = await this.prisma.user.create({
      data: {
        name: registerDto.name,
        email: registerDto.email.toLowerCase(),
        password: registerDto.password,
      },
    });

    // Quitamos el password del objeto antes de enviarlo al front por seguridad
    const { password, ...result } = newUser;
    return result;
  }
}
