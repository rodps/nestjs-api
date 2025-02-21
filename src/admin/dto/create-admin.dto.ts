import { Admin } from '../admin.entity';

export class CreateAdminDto {
  email: string;
  password: string;
  username: string;

  public toEntity(): Admin {
    const admin = new Admin();
    admin.email = this.email;
    admin.password = this.password;
    admin.username = this.username;
    return admin;
  }
}
