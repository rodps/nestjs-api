import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'The email field is required' })
  email: string;
  @IsNotEmpty({ message: 'The password field is required' })
  password: string;
}
