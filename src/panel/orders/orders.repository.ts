import { EntityRepository } from '@mikro-orm/postgresql';
import { Order } from '../../common/entities/order.entity';

export class OrdersRepository extends EntityRepository<Order> {}
