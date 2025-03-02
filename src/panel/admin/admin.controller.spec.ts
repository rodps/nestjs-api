/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

describe('Admin Controller', () => {
  let adminController: AdminController;
  let adminService: AdminService;

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

  const mockAdminService = {
    findOne: jest.fn(() => mockAdmin),
    findOneByEmail: jest.fn(() => mockAdmin),
    create: jest.fn(() => mockAdmin),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: AdminService,
          useValue: mockAdminService,
        },
      ],
      imports: [JwtModule.register({})],
    }).compile();

    adminController = moduleRef.get<AdminController>(AdminController);
    adminService = moduleRef.get<AdminService>(AdminService);
  });

  describe('findOne', () => {
    it('should call findOne from AdminService', async () => {
      const id = 1;

      await adminController.findOne(id);

      expect(adminService.findOne).toHaveBeenCalledWith(id);
    });

    it('should return the admin details', async () => {
      const result = await adminController.findOne(1);

      expect(result).toEqual(mockAdmin);
    });

    it('should throw an error if admin is not found', async () => {
      jest.spyOn(adminService, 'findOne').mockRejectedValueOnce(new Error());

      await expect(adminController.findOne(1)).rejects.toThrow();
    });

    it('should be a get method', () => {
      expect(
        Reflect.getMetadata('method', AdminController.prototype.findOne),
      ).toBe(RequestMethod.GET);
    });

    it('should be private', () => {
      expect(
        Reflect.getMetadata('isPublic', AdminController.prototype.findOne),
      ).toBeFalsy();
    });
  });

  describe('create', () => {
    it('should call create from AdminService', async () => {
      const adminDto = makeAdminDto();

      await adminController.create(adminDto);

      expect(adminService.create).toHaveBeenCalledWith(adminDto);
    });

    it('should return the created admin', async () => {
      const adminDto = makeAdminDto();

      const result = await adminController.create(adminDto);

      expect(result).toEqual(mockAdmin);
    });

    it('should throw an error if admin is not created', async () => {
      const adminDto = makeAdminDto();
      jest.spyOn(adminService, 'create').mockRejectedValueOnce(new Error());

      await expect(adminController.create(adminDto)).rejects.toThrow();
    });

    it('should be public', () => {
      expect(
        Reflect.getMetadata('isPublic', AdminController.prototype.create),
      ).toBe(true);
    });

    it('should be a post method', () => {
      expect(
        Reflect.getMetadata('method', AdminController.prototype.create),
      ).toBe(RequestMethod.POST);
    });
  });
});
