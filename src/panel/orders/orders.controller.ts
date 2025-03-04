import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderItemDto } from './dto/order-item.dto';
import { UserRole } from 'src/common/enums/roles.enum';
import { Auth } from 'src/common/decorators/auth.decorator';

@Controller('orders')
@Auth(UserRole.ADMIN)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() data: CreateOrderDto) {
    return await this.ordersService.create(data);
  }

  @Get()
  async findAll() {
    return await this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.ordersService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: UpdateOrderDto) {
    return await this.ordersService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number) {
    return await this.ordersService.remove(id);
  }

  @Put(':id/items')
  async updateItems(@Param('id') id: number, @Body() data: OrderItemDto) {
    return await this.ordersService.updateItems(id, data);
  }
}
