import { EntityRepository } from '@mikro-orm/postgresql';
import { Product } from '../entities/product.entity';

export class ProductsRepository extends EntityRepository<Product> {}
