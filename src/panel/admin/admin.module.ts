import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { PasswordService } from './password.service';
import { AdminController } from './admin.controller';
import { AdminRepository } from './admin.repository';

@Module({
  providers: [AdminService, PasswordService, AdminRepository],
  exports: [AdminService, PasswordService],
  controllers: [AdminController],
})
export class AdminModule {}
