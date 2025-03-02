import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Public } from 'src/panel/auth/decorators/public.decorator';
import { AuthGuard } from '../auth/auth.guard';

@Controller()
@UseGuards(AuthGuard)
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
