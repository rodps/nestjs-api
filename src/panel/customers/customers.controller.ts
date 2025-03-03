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
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/roles.enum';

@Controller()
@UseGuards(JwtAuthGuard)
@Roles([UserRole.ADMIN])
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
