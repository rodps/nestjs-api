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
  let passwordService: PasswordService;
  let entityManager: EntityManager;

  const makeAdminDto = () => {
    const adminDto = new CreateAdminDto();
    adminDto.email = 'test@email.com';
    adminDto.password = '123456';
    adminDto.username = 'test';
    return adminDto;
  };

  const mockAdmin = new Admin({
    id: 1,
    email: 'test@email.com',
    username: 'test',
    password: '123456',
  });

  const mockAdminRepository = {
    findOneOrFail: jest.fn(() => mockAdmin),
    findOne: jest.fn(() => null),
  };

  const mockEntityManager = {
    persistAndFlush: jest.fn(),
  };

  const mockPasswordService = {
    hashPassword: jest.fn(() => 'hashedPassword'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: AdminRepository,
          useValue: mockAdminRepository,
        },
        {
          provide: EntityManager,
          useValue: mockEntityManager,
        },
        {
          provide: PasswordService,
          useValue: mockPasswordService,
        },
      ],
    }).compile();

    adminService = module.get<AdminService>(AdminService);
    adminRepository = module.get<AdminRepository>(AdminRepository);
    passwordService = module.get<PasswordService>(PasswordService);
    entityManager = module.get<EntityManager>(EntityManager);
  });

  describe('findOne', () => {
    it('should return an admin by id', async () => {
      expect(await adminService.findOne(1)).toBe(mockAdmin);
    });

    it('should throw an error if admin is not found', async () => {
      jest
        .spyOn(adminRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(adminService.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOneByEmail', () => {
    it('should return an admin by email', async () => {
      const result = await adminService.findOneByEmail('test@email.com');

      expect(result).toBe(mockAdmin);
    });

    it('should call findOneOrFail with correct arguments', async () => {
      const email = 'test@email.com';

      await adminService.findOneByEmail(email);

      expect(adminRepository.findOneOrFail).toHaveBeenCalledWith({
        email,
      });
    });

    it('should throw an error if admin is not found', async () => {
      jest
        .spyOn(adminRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(
        adminService.findOneByEmail('test@email.com'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should return the created admin', async () => {
      const admin = makeAdminDto();

      const result = await adminService.create(admin);

      expect(entityManager.persistAndFlush).toHaveBeenCalledWith(result);
      expect(result.email).toBe(admin.email);
      expect(result.username).toBe(admin.username);
      expect(result.password).toBe('hashedPassword');
    });

    it('should call findOne with correct arguments', async () => {
      const admin = makeAdminDto();

      await adminService.create(admin);

      expect(adminRepository.findOne).toHaveBeenCalledWith({
        email: admin.email,
      });
    });

    it('should call hashPassword with correct arguments', async () => {
      const admin = makeAdminDto();

      await adminService.create(admin);

      expect(passwordService.hashPassword).toHaveBeenCalledWith(admin.password);
    });

    it('should throw an error if email is already in use', async () => {
      const admin = makeAdminDto();

      jest.spyOn(adminRepository, 'findOne').mockResolvedValue(admin);

      await expect(adminService.create(admin)).rejects.toThrow(
        ConflictException,
      );
    });
  });
});
