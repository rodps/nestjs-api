import { EntityRepository } from '@mikro-orm/postgresql';
import { Product } from './product.entity';

export class ProductsRepository extends EntityRepository<Product> {}
