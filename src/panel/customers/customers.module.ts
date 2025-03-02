import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Customer } from './customer.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Customer])],
  providers: [CustomersService],
  controllers: [CustomersController],
})
export class CustomersModule {}
