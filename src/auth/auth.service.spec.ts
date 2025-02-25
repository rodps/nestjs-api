/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AdminService } from 'src/admin/admin.service';
import { PasswordService } from 'src/admin/password.service';
import { JwtService } from '@nestjs/jwt';
import { Admin } from 'src/admin/admin.entity';
import { UnauthorizedException } from '@nestjs/common';

const getFakeAdmin = () => {
  const admin = new Admin({
    username: 'test',
    password: 'hashedPassword',
    email: 'test@mail.com',
  });
  admin.id = 1;
  return admin;
};

describe('AuthService', () => {
  let authService: AuthService;
  let adminService: AdminService;
  let passwordService: PasswordService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AdminService,
          useValue: {
            findOneByEmail: jest.fn(),
          },
        },
        {
          provide: PasswordService,
          useValue: {
            comparePassword: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
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
      const email = 'test@mail.com';
      const pass = 'password';
      const user = getFakeAdmin();
      jest.spyOn(adminService, 'findOneByEmail').mockResolvedValue(user);
      jest.spyOn(passwordService, 'comparePassword').mockResolvedValue(false);

      await expect(authService.signIn(email, pass)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should return a JWT token', async () => {
      const email = 'test@mail.com';
      const pass = 'password';
      const user = getFakeAdmin();
      jest.spyOn(adminService, 'findOneByEmail').mockResolvedValue(user);
      jest.spyOn(passwordService, 'comparePassword').mockResolvedValue(true);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('token');

      expect(await authService.signIn(email, pass)).toBe('token');
    });

    it('should call findOneByEmail with correct arguments', async () => {
      const email = 'test@mail.com';
      const pass = 'password';
      const user = getFakeAdmin();
      jest.spyOn(adminService, 'findOneByEmail').mockResolvedValue(user);
      jest.spyOn(passwordService, 'comparePassword').mockResolvedValue(true);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('token');

      await authService.signIn(email, pass);

      expect(adminService.findOneByEmail).toHaveBeenCalledWith(email);
    });

    it('should call comparePassword with correct arguments', async () => {
      const email = 'test@mail.com';
      const pass = 'password';
      const user = getFakeAdmin();
      jest.spyOn(adminService, 'findOneByEmail').mockResolvedValue(user);
      jest.spyOn(passwordService, 'comparePassword').mockResolvedValue(true);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('token');

      await authService.signIn(email, pass);

      expect(passwordService.comparePassword).toHaveBeenCalledWith(
        pass,
        user.password,
      );
    });

    it('should call signAsync with correct arguments', async () => {
      const email = 'test@mail.com';
      const pass = 'password';
      const user = getFakeAdmin();
      jest.spyOn(adminService, 'findOneByEmail').mockResolvedValue(user);
      jest.spyOn(passwordService, 'comparePassword').mockResolvedValue(true);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('token');

      await authService.signIn(email, pass);

      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: user.id,
        username: user.username,
      });
    });
  });
});
