import { Module } from '@nestjs/common';
import { StoreAccountService } from './store-account.service';
import { StoreAccountController } from './store-account.controller';
import { StoreAccountRepository } from './store-account.repository';
import { PasswordService } from 'src/common/services/password.service';

@Module({
  controllers: [StoreAccountController],
  providers: [StoreAccountService, StoreAccountRepository, PasswordService],
})
export class StoreAccountModule {}
