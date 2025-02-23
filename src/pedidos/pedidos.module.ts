import { Module } from '@nestjs/common';
import { PedidosController } from './pedidos.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Pedido } from './pedido.entity';
import { Cliente } from '../clientes/cliente.entity';
import { Produto } from '../produtos/produto.entity';
import { PedidosService } from './pedidos.service';

@Module({
  imports: [MikroOrmModule.forFeature([Pedido, Cliente, Produto])],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule {}
