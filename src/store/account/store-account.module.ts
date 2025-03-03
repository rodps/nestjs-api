import { Module } from '@nestjs/common';
import { StoreAccountService } from './store-account.service';
import { StoreAccountController } from './store-account.controller';
import { StoreAccountRepository } from './store-account.repository';

@Module({
  controllers: [StoreAccountController],
  providers: [StoreAccountService, StoreAccountRepository],
})
export class StoreAccountModule {}
