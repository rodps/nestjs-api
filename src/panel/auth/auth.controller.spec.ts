/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RequestMethod } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtModule } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const makeLoginDto = () => {
    const loginDto = new LoginDto();
    loginDto.email = 'test@email.com';
    loginDto.password = '123456';
    return loginDto;
  };

  const mockAuthService = {
    signIn: jest.fn(() => ({ accessToken: 'token' })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
      imports: [JwtModule],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return a JWT token', async () => {
      const loginDto = makeLoginDto();

      expect(await controller.login(loginDto)).toEqual({
        accessToken: 'token',
      });
    });

    it('should call authService.signIn with correct arguments', async () => {
      const loginDto = makeLoginDto();

      await controller.login(loginDto);

      expect(authService.signIn).toHaveBeenCalledWith(
        loginDto.email,
        loginDto.password,
      );
    });

    it('should throw an error if authService.signIn throws an error', async () => {
      const loginDto = makeLoginDto();
      jest.spyOn(authService, 'signIn').mockRejectedValueOnce(new Error());

      await expect(controller.login(loginDto)).rejects.toThrow();
    });

    it('should be a post method', () => {
      expect(
        Reflect.getMetadata('method', AuthController.prototype.login),
      ).toBe(RequestMethod.POST);
    });
  });
});
