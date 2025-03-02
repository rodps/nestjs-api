import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';
import { OrderItemDto } from './order-item.dto';

export class CreateOrderDto {
  @IsNotEmpty()
  customerId: number;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  items: OrderItemDto[];
}
