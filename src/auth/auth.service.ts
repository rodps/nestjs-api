import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { PasswordService } from 'src/admin/password.service';
import { JwtPayload } from './types/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<string> {
    const user = await this.adminService.findOneByEmail(email);

    const isSamePass = await this.passwordService.comparePassword(
      pass,
      user.password,
    );

    if (!isSamePass) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = { sub: user.id, username: user.username };
    return await this.jwtService.signAsync(payload);
  }
}
