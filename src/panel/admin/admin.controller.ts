import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/roles.enum';

@Controller()
@UseGuards(JwtAuthGuard)
@Roles([UserRole.ADMIN])
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
