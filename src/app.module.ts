import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from './mikro-orm.config';
import { PanelModule } from './panel/panel.module';
import { StoreModule } from './store/store.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MikroOrmModule.forRoot(config),
    JwtModule.register({
      global: true,
      secret: 'secret',
    }),
    PanelModule,
    StoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
