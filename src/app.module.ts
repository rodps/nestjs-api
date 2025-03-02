import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from './mikro-orm.config';
import { PainelModule } from './painel/painel.module';

@Module({
  imports: [MikroOrmModule.forRoot(config), PainelModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
