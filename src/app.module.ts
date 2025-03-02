import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from './mikro-orm.config';
import { PanelModule } from './panel/panel.module';

@Module({
  imports: [MikroOrmModule.forRoot(config), PanelModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
