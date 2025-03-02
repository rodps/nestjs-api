import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/crate-cliente.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller()
@UseGuards(AuthGuard)
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  async create(@Body() data: CreateClienteDto) {
    return await this.clientesService.create(data);
  }

  @Get()
  async findAll() {
    return await this.clientesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.clientesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: CreateClienteDto) {
    return await this.clientesService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.clientesService.remove(id);
  }
}
