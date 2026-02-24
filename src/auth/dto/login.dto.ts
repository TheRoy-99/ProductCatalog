import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6) // Validamos que la clave tenga al menos 6 caracteres
  password!: string;
}
