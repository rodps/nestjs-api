import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { PasswordService } from './password.service';
import { AdminController } from './admin.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Admin } from './admin.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Admin])],
  providers: [AdminService, PasswordService],
  exports: [AdminService, PasswordService],
  controllers: [AdminController],
})
export class AdminModule {}
