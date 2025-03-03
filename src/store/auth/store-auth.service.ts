import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from 'src/common/services/password.service';
import { JwtPayload } from './types/jwt-payload';
import { JwtDto } from './dto/jwt.dto';
import { StoreAccountRepository } from '../account/store-account.repository';

@Injectable()
export class StoreAuthService {
  constructor(
    private readonly accountRepository: StoreAccountRepository,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, pass: string): Promise<JwtDto> {
    const user = await this.accountRepository.findOne({ email });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isSamePass = await this.passwordService.comparePassword(
      pass,
      user.password,
    );

    if (!isSamePass) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = { sub: user.id, username: user.name };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
