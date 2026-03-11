import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt'; // <-- Importamos para el token

@Injectable()
export class AuthService {
  // Inyectamos el servicio de Prisma y el de JWT
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService, 
  ) {}

  async login(loginDto: LoginDto) {
    // 1. Buscamos el usuario igual que antes
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email.toLowerCase() },
    });

    // 2. Mantenemos la validación de seguridad de tu compañero
    if (!user || user.password !== loginDto.password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 3. Quitamos el password por seguridad (como lo tenía tu compañero)
    const { password, ...result } = user;

    // 4. CREAMOS EL TOKEN (Esto es lo que permite que tu tarea funcione)
    const payload = { sub: user.id, email: user.email };
    
    return {
      ...result, // Aquí devolvemos el id, name y email (Lo de tu compañero)
      access_token: await this.jwtService.signAsync(payload), // El token (Lo tuyo)
    };
  }
  
  async register(registerDto: RegisterDto) {
    // Verificamos si el email ya está registrado
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email.toLowerCase() },
    });

    if (existingUser) {
      throw new UnauthorizedException('El email ya esta registrado');
    }

    // Creamos el nuevo usuario con Prisma
    const newUser = await this.prisma.user.create({
      data: {
        name: registerDto.name,
        email: registerDto.email.toLowerCase(),
        password: registerDto.password,
      },
    });

    const { password, ...result } = newUser;
    return result;
  }
}