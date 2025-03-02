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
  UseGuards,
} from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PedidoItemDto } from './dto/pedido-item.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller()
@UseGuards(AuthGuard)
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  async create(@Body() data: CreatePedidoDto) {
    return await this.pedidosService.create(data);
  }

  @Get()
  async findAll() {
    return await this.pedidosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.pedidosService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: UpdatePedidoDto) {
    return await this.pedidosService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number) {
    return await this.pedidosService.remove(id);
  }

  @Put(':id/itens')
  async updateItens(@Param('id') id: number, @Body() data: PedidoItemDto) {
    return await this.pedidosService.updateItens(id, data);
  }
}
