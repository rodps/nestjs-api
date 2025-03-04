import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminModule } from 'src/panel/admin/admin.module';

@Module({
  imports: [AdminModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
