import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import config from './mikro-orm.config';
import { AuthGuard } from './auth/auth.guard';
import { ProdutosModule } from './produtos/produtos.module';
import { ClientesModule } from './clientes/clientes.module';
import { PedidosModule } from './pedidos/pedidos.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(config),
    AdminModule,
    AuthModule,
    ProdutosModule,
    ClientesModule,
    PedidosModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
