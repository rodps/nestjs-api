import { EntityRepository } from '@mikro-orm/postgresql';
import { Product } from '../entities/product.entity';
import { Pagination } from '../pagination';
import { Page } from '../page';

export interface ProductsRepositoryFilters {
  name?: string;
  priceMin?: number;
  priceMax?: number;
}

export interface ProductsRepositoryOptions {
  orderBy?: string;
  sort?: string;
}

export class ProductsRepository extends EntityRepository<Product> {
  async findBy(
    filters: ProductsRepositoryFilters,
    pagination: Pagination,
    options?: ProductsRepositoryOptions,
  ): Promise<Page<Product>> {
    const qb = this.createQueryBuilder('p');

    qb.select('*');
    if (filters.name) {
      qb.andWhere({ name: { $ilike: `%${filters.name}%` } });
    }
    if (filters.priceMin) {
      qb.andWhere({ price: { $gte: filters.priceMin } });
    }
    if (filters.priceMax) {
      qb.andWhere({ price: { $lte: filters.priceMax } });
    }

    const count = await qb.getCount();

    if (options?.orderBy) {
      qb.orderBy({
        [options.orderBy]: options.sort === 'desc' ? 'DESC' : 'ASC',
      });
    }

    qb.limit(pagination.limit);
    qb.offset(pagination.offset);

    const products: Product[] = await qb.execute();

    return new Page(pagination, products, count);
  }
}
