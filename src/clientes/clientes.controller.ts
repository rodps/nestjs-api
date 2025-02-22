import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/crate-cliente.dto';
import { ClienteDto } from './dto/cliente.dto';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  async create(@Body() data: CreateClienteDto): Promise<ClienteDto> {
    const cliente = data.toEntity();
    await this.clientesService.create(cliente);
    return ClienteDto.fromEntity(cliente);
  }

  @Get()
  async findAll(): Promise<ClienteDto[]> {
    return (await this.clientesService.findAll()).map((cliente) =>
      ClienteDto.fromEntity(cliente),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ClienteDto> {
    return await this.clientesService
      .findOne(id)
      .then((cliente) => ClienteDto.fromEntity(cliente));
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: CreateClienteDto,
  ): Promise<ClienteDto> {
    return await this.clientesService
      .update(id, data.toEntity())
      .then((cliente) => {
        return ClienteDto.fromEntity(cliente);
      });
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.clientesService.remove(id);
  }
}
