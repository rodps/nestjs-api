/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RequestMethod } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return a JWT token', async () => {
      const loginDto = { email: 'test@email.com', password: 'password' };
      const jwtDto = { accessToken: 'token' };
      jest.spyOn(authService, 'signIn').mockResolvedValue(jwtDto.accessToken);

      expect(await controller.login(loginDto)).toEqual(jwtDto);
    });

    it('should call authService.signIn with correct arguments', async () => {
      const loginDto = { email: 'test@email.com', password: 'password' };
      jest.spyOn(authService, 'signIn').mockResolvedValue('token');

      await controller.login(loginDto);

      expect(authService.signIn).toHaveBeenCalledWith(
        loginDto.email,
        loginDto.password,
      );
    });

    it('should throw an error if authService.signIn throws an error', async () => {
      const loginDto = { email: 'test@mail.com', password: 'password' };
      jest.spyOn(authService, 'signIn').mockRejectedValue(new Error());

      await expect(controller.login(loginDto)).rejects.toThrow();
    });

    it('should be public', () => {
      expect(
        Reflect.getMetadata('isPublic', AuthController.prototype.login),
      ).toBe(true);
    });

    it('should be a post method', () => {
      expect(
        Reflect.getMetadata('method', AuthController.prototype.login),
      ).toBe(RequestMethod.POST);
    });
  });
});
