/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { AdminRepository } from './admin.repository';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Admin } from './admin.entity';
import { PasswordService } from './password.service';

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
            findOne: jest.fn(),
            count: jest.fn(),
            getEntityManager: jest.fn(),
          },
        },
        {
          provide: EntityManager,
          useValue: {
            persistAndFlush: jest.fn(),
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
      jest.spyOn(adminRepository, 'findOne').mockResolvedValue(admin);

      expect(await adminService.getDetailsById(1)).toBe(admin);
    });

    it('should throw an error if admin is not found', async () => {
      await expect(adminService.getDetailsById(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getDetailsByEmail', () => {
    it('should return an admin by email', async () => {
      const admin = { email: 'test@mail.com' };
      jest.spyOn(adminRepository, 'findOne').mockResolvedValue(admin);

      expect(await adminService.getDetailsByEmail(admin.email)).toBe(admin);
      expect(adminRepository.findOne).toHaveBeenCalledWith({
        email: admin.email,
      });
    });

    it('should throw an error if admin is not found', async () => {
      await expect(
        adminService.getDetailsByEmail('test@email.com'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('save', () => {
    it('should save an admin', async () => {
      const admin = new Admin();
      admin.email = 'test@email.com';
      admin.password = '123456';
      jest.spyOn(adminRepository, 'count').mockResolvedValue(0);
      jest.spyOn(entityManager, 'persistAndFlush').mockResolvedValue(undefined);
      jest
        .spyOn(passwordService, 'hashPassword')
        .mockResolvedValue('hashedPassword');

      await adminService.save(admin);
      expect(adminRepository.count).toHaveBeenCalledWith({
        email: admin.email,
      });
      expect(entityManager.persistAndFlush).toHaveBeenCalledWith(admin);
      expect(passwordService.hashPassword).toHaveBeenCalledWith('123456');
      expect(admin.password).toBe('hashedPassword');
    });

    it('should throw an error if admin already exists', async () => {
      const admin = new Admin();
      admin.email = 'test@admin.com';
      jest.spyOn(adminRepository, 'count').mockResolvedValue(1);

      await expect(adminService.save(admin)).rejects.toThrow(ConflictException);
    });
  });
});
