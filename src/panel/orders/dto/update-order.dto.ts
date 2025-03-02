import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus } from '../../../common/entities/order.entity';

export class UpdateOrderDto {
  @IsOptional()
  address: string;

  @IsOptional()
  @IsEnum(OrderStatus, {
    message: 'Invalid status',
  })
  status: number;

  @IsOptional()
  orderDate: Date;

  @IsOptional()
  deliveryDate: Date;
}
