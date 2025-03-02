import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { ProdutosModule } from './produtos/produtos.module';
import { ClientesModule } from './clientes/clientes.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    AdminModule,
    AuthModule,
    ProdutosModule,
    ClientesModule,
    PedidosModule,
    RouterModule.register([
      {
        path: 'painel',
        children: [
          { path: 'admin', module: AdminModule },
          { path: 'auth', module: AuthModule },
          { path: 'produtos', module: ProdutosModule },
          { path: 'clientes', module: ClientesModule },
          { path: 'pedidos', module: PedidosModule },
        ],
      },
    ]),
  ],
})
export class PainelModule {}
