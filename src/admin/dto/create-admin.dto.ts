import { Admin } from '../admin.entity';
import { IsNotEmpty } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  username: string;

  public toEntity(): Admin {
    const admin = new Admin();
    admin.email = this.email;
    admin.password = this.password;
    admin.username = this.username;
    return admin;
  }
}
