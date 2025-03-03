import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Customer } from 'src/common/entities/customer.entity';
import { Product } from 'src/common/entities/product.entity';
import { Order } from 'src/common/entities/order.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Order, Customer, Product])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
