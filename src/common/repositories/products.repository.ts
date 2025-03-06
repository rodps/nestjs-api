import { EntityRepository } from '@mikro-orm/postgresql';
import { Product } from '../entities/product.entity';

export interface FindOptions {
  limit?: number;
  offset?: number;
  order?: { [key: string]: 'asc' | 'desc' };
}

export interface FindFilters {
  name?: string;
  priceMin?: number;
  priceMax?: number;
}

export class ProductsRepository extends EntityRepository<Product> {
  async findBy(
    filters: FindFilters,
    options?: FindOptions,
  ): Promise<Product[]> {
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
    if (options?.order) {
      qb.orderBy(options.order);
    }
    if (options?.limit) {
      qb.limit(options.limit);
    }
    if (options?.offset) {
      qb.offset(options.offset);
    }

    return qb.execute();
  }
}
