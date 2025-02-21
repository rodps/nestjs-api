/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { RequestMethod } from '@nestjs/common';

describe('Admin Controller', () => {
  let adminController: AdminController;
  let adminService: AdminService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: AdminService,
          useValue: {
            getDetailsById: jest.fn(),
            getDetailsByEmail: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    adminController = moduleRef.get<AdminController>(AdminController);
    adminService = moduleRef.get<AdminService>(AdminService);
  });

  describe('getDetails', () => {
    it('should call getDetailsById from AdminService', async () => {
      const admin = new Admin();
      admin.id = 1;
      jest.spyOn(adminService, 'getDetailsById').mockResolvedValue(admin);

      await adminController.getDetails(admin.id);

      expect(adminService.getDetailsById).toHaveBeenCalledWith(admin.id);
    });

    it('should return the admin details', async () => {
      const admin = new Admin();
      admin.id = 1;
      jest.spyOn(adminService, 'getDetailsById').mockResolvedValue(admin);

      const result = await adminController.getDetails(admin.id);

      expect(result).toEqual(admin);
    });

    it('should throw an error if admin is not found', async () => {
      jest.spyOn(adminService, 'getDetailsById').mockRejectedValue(new Error());

      await expect(adminController.getDetails(1)).rejects.toThrow();
    });
  });

  describe('create', () => {
    it('should call save from AdminService', async () => {
      const adminDto = new CreateAdminDto();
      jest.spyOn(adminService, 'save').mockResolvedValue();

      await adminController.create(adminDto);

      expect(adminService.save).toHaveBeenCalledWith(adminDto.toEntity());
    });

    it('should return the created admin', async () => {
      const adminDto = new CreateAdminDto();
      adminDto.email = 'test@email.com';
      const admin = adminDto.toEntity();
      jest.spyOn(adminService, 'save').mockResolvedValue();

      const result = await adminController.create(adminDto);

      expect(result).toEqual(admin);
    });

    it('should throw an error if admin is not created', async () => {
      const adminDto = new CreateAdminDto();
      jest.spyOn(adminService, 'save').mockRejectedValue(new Error());

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

    it('should have the correct path', () => {
      expect(
        Reflect.getMetadata('path', AdminController.prototype.create),
      ).toBe('/');
    });
  });
});
