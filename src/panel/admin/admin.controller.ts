import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { UserRole } from 'src/common/enums/roles.enum';
import { Auth } from 'src/common/decorators/auth.decorator';

@Controller()
@Auth(UserRole.ADMIN)
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
