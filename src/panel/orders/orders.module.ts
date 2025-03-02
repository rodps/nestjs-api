import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Order } from './entities/order.entity';
import { Customer } from '../customers/customer.entity';
import { Product } from '../products/product.entity';
import { OrdersService } from './orders.service';

@Module({
  imports: [MikroOrmModule.forFeature([Order, Customer, Product])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
