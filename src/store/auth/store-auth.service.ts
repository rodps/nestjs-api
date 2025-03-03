import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from 'src/common/services/password.service';
import { JwtDto } from './dto/jwt.dto';
import { JwtPayload } from 'src/common/types/jwt-payload';
import { UserRole } from 'src/common/enums/roles.enum';
import { CustomersRepository } from 'src/common/repositories/customers.repository';

@Injectable()
export class StoreAuthService {
  constructor(
    private readonly customersRepository: CustomersRepository,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, pass: string): Promise<JwtDto> {
    const user = await this.customersRepository.findOne({ email });

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

    const payload: JwtPayload = {
      sub: user.id,
      username: user.name,
      role: UserRole.STORE,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
