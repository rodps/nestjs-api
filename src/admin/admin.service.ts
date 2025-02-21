import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import { Admin } from './admin.entity';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepository: AdminRepository) {}

  async getDetailsById(id: number): Promise<Admin> {
    const admin = await this.adminRepository.findOne(id);

    if (!admin) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return admin;
  }

  async getDetailsByEmail(email: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ email });

    if (!admin) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return admin;
  }

  async save(admin: Admin): Promise<void> {
    const exists = await this.adminRepository.count({
      email: admin.email,
    });

    if (exists > 0) {
      throw new ConflictException('Usuário já cadastrado');
    }

    await this.adminRepository.getEntityManager().persistAndFlush(admin);
  }
}
