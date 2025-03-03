import { Module } from '@nestjs/common';
import { StoreAuthController } from './store-auth.controller';
import { StoreAuthService } from './store-auth.service';
import { PasswordService } from 'src/common/services/password.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Customer } from 'src/common/entities/customer.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Customer])],
  controllers: [StoreAuthController],
  providers: [StoreAuthService, PasswordService],
})
export class StoreAuthModule {}
