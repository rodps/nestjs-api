import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get(':id')
  async getDetails(@Param('id') id: number): Promise<AdminDto> {
    return this.adminService
      .getDetailsById(id)
      .then((admin) => AdminDto.fromEntity(admin));
  }

  @Public()
  @Post()
  async create(@Body() createAdminDto: CreateAdminDto): Promise<AdminDto> {
    const admin = createAdminDto.toEntity();
    return this.adminService.save(admin).then(() => AdminDto.fromEntity(admin));
  }
}
