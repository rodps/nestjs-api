import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import config from './mikro-orm.config';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [MikroOrmModule.forRoot(config), AdminModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
