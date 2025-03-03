import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CustomersRepository } from './customers.repository';
import { PasswordService } from 'src/common/services/password.service';

@Module({
  providers: [CustomersService, CustomersRepository, PasswordService],
  controllers: [CustomersController],
})
export class CustomersModule {}
