import { EntityRepository } from '@mikro-orm/postgresql';
import { Product } from '../../common/entities/product.entity';

export class ProductsRepository extends EntityRepository<Product> {}
