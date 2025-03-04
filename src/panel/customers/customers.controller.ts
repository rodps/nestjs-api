import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer';
import { UserRole } from 'src/common/enums/roles.enum';
import { Auth } from 'src/common/decorators/auth.decorator';

@Controller()
@Auth(UserRole.ADMIN)
export class CustomersController {
  constructor(private readonly clientesService: CustomersService) {}

  @Post()
  async create(@Body() data: CreateCustomerDto) {
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
  async update(@Param('id') id: number, @Body() data: CreateCustomerDto) {
    return await this.clientesService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.clientesService.remove(id);
  }
}
