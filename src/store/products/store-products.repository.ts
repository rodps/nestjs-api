import { EntityRepository } from '@mikro-orm/postgresql';
import { Product } from 'src/common/entities/product.entity';

export class StoreProductsRepository extends EntityRepository<Product> {}
