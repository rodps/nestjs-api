import { EntityRepository } from '@mikro-orm/postgresql';
import { Pedido } from './entities/pedido.entity';

export class PedidosRepository extends EntityRepository<Pedido> {}
