import { ConflictException, Injectable } from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import { Admin } from './admin.entity';
import { EntityManager } from '@mikro-orm/postgresql';
import { PasswordService } from './password.service';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly em: EntityManager,
    private readonly passwordService: PasswordService,
  ) {}

  async findOne(id: number): Promise<Admin> {
    return await this.adminRepository.findOneOrFail(id);
  }

  async findOneByEmail(email: string): Promise<Admin> {
    return await this.adminRepository.findOneOrFail({ email });
  }

  async create(data: CreateAdminDto): Promise<Admin> {
    const exists = await this.adminRepository.findOne({
      email: data.email,
    });
    if (exists) {
      throw new ConflictException('Usuário já cadastrado');
    }

    const admin = new Admin({
      ...data,
      password: await this.passwordService.hashPassword(data.password),
    });

    await this.em.persistAndFlush(admin);
    return admin;
  }
}
