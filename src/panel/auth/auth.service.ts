import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/panel/admin/admin.service';
import { PasswordService } from 'src/common/services/password.service';
import { JwtPayload } from '../../common/types/jwt-payload';
import { JwtDto } from './dto/jwt.dto';
import { UserRole } from 'src/common/enums/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<JwtDto> {
    const user = await this.adminService.findOneByEmail(email);

    const isSamePass = await this.passwordService.comparePassword(
      pass,
      user.password,
    );

    if (!isSamePass) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      role: UserRole.ADMIN,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1d',
      }),
    };
  }
}
