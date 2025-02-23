import { EntityRepository } from '@mikro-orm/postgresql';
import { Pedido } from './pedido.entity';

export class PedidosRepository extends EntityRepository<Pedido> {}
