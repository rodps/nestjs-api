/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { AdminRepository } from './admin.repository';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Admin } from './admin.entity';
import { PasswordService } from './password.service';
import { CreateAdminDto } from './dto/create-admin.dto';

describe('AdminService', () => {
  let adminService: AdminService;
  let adminRepository: AdminRepository;
  let entityManager: EntityManager;
  let passwordService: PasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: AdminRepository,
          useValue: {
            findOneOrFail: jest.fn(),
            findOne: jest.fn(),
            getEntityManager: jest.fn(),
          },
        },
        {
          provide: EntityManager,
          useValue: {
            flush: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: PasswordService,
          useValue: {
            hashPassword: jest.fn(),
          },
        },
      ],
    }).compile();

    adminService = module.get<AdminService>(AdminService);
    adminRepository = module.get<AdminRepository>(AdminRepository);
    entityManager = module.get<EntityManager>(EntityManager);
    passwordService = module.get<PasswordService>(PasswordService);
  });

  describe('getDetailsById', () => {
    it('should return an admin by id', async () => {
      const admin = { id: 1 };
      jest.spyOn(adminRepository, 'findOneOrFail').mockResolvedValue(admin);

      expect(await adminService.getDetailsById(1)).toBe(admin);
    });

    it('should throw an error if admin is not found', async () => {
      jest
        .spyOn(adminRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(adminService.getDetailsById(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getDetailsByEmail', () => {
    it('should return an admin by email', async () => {
      const admin = { email: 'test@mail.com' };
      jest.spyOn(adminRepository, 'findOneOrFail').mockResolvedValue(admin);

      const result = await adminService.getDetailsByEmail(admin.email);

      expect(result).toBe(admin);
      expect(adminRepository.findOneOrFail).toHaveBeenCalledWith({
        email: admin.email,
      });
    });

    it('should throw an error if admin is not found', async () => {
      jest
        .spyOn(adminRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(
        adminService.getDetailsByEmail('test@email.com'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('save', () => {
    it('should save an admin', async () => {
      const admin = new CreateAdminDto();
      admin.email = 'test@email.com';
      admin.password = '123456';
      jest.spyOn(adminRepository, 'findOne').mockResolvedValue(null);
      jest
        .spyOn(passwordService, 'hashPassword')
        .mockResolvedValue('hashedPassword');

      await adminService.save(admin);
      expect(adminRepository.findOne).toHaveBeenCalledWith({
        email: admin.email,
      });
      expect(entityManager.create).toHaveBeenCalledWith(Admin, {
        ...admin,
        password: 'hashedPassword',
      });
      expect(passwordService.hashPassword).toHaveBeenCalledWith('123456');
    });

    it('should throw an error if admin already exists', async () => {
      const admin = new Admin();
      admin.email = 'test@admin.com';
      jest.spyOn(adminRepository, 'findOne').mockResolvedValue(admin);

      await expect(adminService.save(admin)).rejects.toThrow(ConflictException);
    });
  });
});
