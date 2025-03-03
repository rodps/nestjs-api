import { Module } from '@nestjs/common';
import { StoreAuthController } from './store-auth.controller';
import { StoreAuthService } from './store-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { StoreAccountRepository } from '../account/store-account.repository';
import { PasswordService } from 'src/common/services/password.service';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [StoreAuthController],
  providers: [StoreAuthService, StoreAccountRepository, PasswordService],
})
export class StoreAuthModule {}
