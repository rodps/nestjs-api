/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AdminService } from 'src/painel/admin/admin.service';
import { PasswordService } from 'src/painel/admin/password.service';
import { JwtService } from '@nestjs/jwt';
import { Admin } from 'src/painel/admin/admin.entity';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let adminService: AdminService;
  let passwordService: PasswordService;
  let jwtService: JwtService;

  const mockAdmin = new Admin({
    id: 1,
    username: 'test',
    password: 'hashedPassword',
    email: 'test@mail.com',
  });

  const mockAdminService = {
    findOneByEmail: jest.fn(() => mockAdmin),
  };

  const mockPasswordService = {
    comparePassword: jest.fn(() => true),
  };

  const mockJwtService = {
    signAsync: jest.fn(() => 'token'),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AdminService,
          useValue: mockAdminService,
        },
        {
          provide: PasswordService,
          useValue: mockPasswordService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    adminService = moduleRef.get<AdminService>(AdminService);
    passwordService = moduleRef.get<PasswordService>(PasswordService);
    jwtService = moduleRef.get<JwtService>(JwtService);
  });

  describe('signIn', () => {
    it('should throw UnauthorizedException if password does not match', async () => {
      jest
        .spyOn(passwordService, 'comparePassword')
        .mockResolvedValueOnce(false);

      await expect(
        authService.signIn('test@email.com', 'pass'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should return a JwtDto', async () => {
      expect(await authService.signIn('test@email.com', 'pass')).toEqual({
        accessToken: 'token',
      });
    });

    it('should call findOneByEmail with correct arguments', async () => {
      const email = 'test@mail.com';
      const pass = 'password';

      await authService.signIn(email, pass);

      expect(adminService.findOneByEmail).toHaveBeenCalledWith(email);
    });

    it('should call comparePassword with correct arguments', async () => {
      const email = 'test@mail.com';
      const pass = 'password';

      await authService.signIn(email, pass);

      expect(passwordService.comparePassword).toHaveBeenCalledWith(
        pass,
        mockAdmin.password,
      );
    });

    it('should call signAsync with correct arguments', async () => {
      await authService.signIn('test@mail.com', 'pass');

      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: mockAdmin.id,
        username: mockAdmin.username,
      });
    });
  });
});
