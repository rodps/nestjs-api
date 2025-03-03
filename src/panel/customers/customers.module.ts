import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { PasswordService } from 'src/common/services/password.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Customer } from 'src/common/entities/customer.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Customer])],
  providers: [CustomersService, PasswordService],
  controllers: [CustomersController],
})
export class CustomersModule {}
