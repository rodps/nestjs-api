import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from './mikro-orm.config';
import { PanelModule } from './panel/panel.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [MikroOrmModule.forRoot(config), PanelModule, StoreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
