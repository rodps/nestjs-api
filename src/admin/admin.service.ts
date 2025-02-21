import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import { Admin } from './admin.entity';
import { EntityManager } from '@mikro-orm/postgresql';
import { PasswordService } from './password.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly em: EntityManager,
    private readonly passwordService: PasswordService,
  ) {}

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

    admin.password = await this.passwordService.hashPassword(admin.password);

    await this.em.persistAndFlush(admin);
  }
}
