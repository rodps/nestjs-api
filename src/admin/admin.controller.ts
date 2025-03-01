import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.adminService.findOne(id);
  }

  @Public()
  @Post()
  async create(@Body() data: CreateAdminDto) {
    return await this.adminService.create(data);
  }
}
