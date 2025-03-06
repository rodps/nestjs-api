import { Injectable } from '@nestjs/common';
import { Product } from 'src/common/entities/product.entity';
import {
  FindOptions,
  ProductsRepository,
} from 'src/common/repositories/products.repository';
import { FindAllDto } from './dto/find-all.dto';

@Injectable()
export class StoreProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  findAll(query: FindAllDto): Promise<Product[]> {
    const DEFAULT_LIMIT = 10;

    const options: FindOptions = {};
    options.limit = query.limit || DEFAULT_LIMIT;

    if (query.page) {
      const page = query.page > 0 ? query.page : 1;
      options.offset = (page - 1) * options.limit;
    }
    if (query.orderBy) {
      options.order = {
        [query.orderBy]: query.sort === 'desc' ? 'desc' : 'asc',
      };
    }

    return this.productsRepository.findBy(
      {
        name: query.search,
        priceMin: query.minPrice,
        priceMax: query.maxPrice,
      },
      options,
    );
  }
}
