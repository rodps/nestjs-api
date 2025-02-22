import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'O campo email é obrigatório' })
  email: string;
  @IsNotEmpty({ message: 'O campo password é obrigatório' })
  password: string;
}
