import { Module } from '@nestjs/common';
import { StoreAccountService } from './store-account.service';
import { StoreAccountController } from './store-account.controller';
import { PasswordService } from 'src/common/services/password.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Customer } from 'src/common/entities/customer.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Customer])],
  controllers: [StoreAccountController],
  providers: [StoreAccountService, PasswordService],
})
export class StoreAccountModule {}
