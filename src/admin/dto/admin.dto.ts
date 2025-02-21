import { Admin } from '../admin.entity';

export class AdminDto {
  id: number;
  username: string;
  email: string;

  static fromEntity(admin: Admin): AdminDto {
    return {
      id: admin.id,
      username: admin.username,
      email: admin.email,
    };
  }
}
