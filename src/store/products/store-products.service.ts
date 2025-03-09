import { Injectable } from '@nestjs/common';
import { Product } from 'src/common/entities/product.entity';
import {
  FindOptions,
  ProductsRepository,
} from 'src/common/repositories/products.repository';
import { FindAllDto } from './dto/find-all.dto';
import { Pagination } from 'src/common/pagination';
import { Page } from 'src/common/page';

@Injectable()
export class StoreProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async findAll(query: FindAllDto): Promise<Page<Product>> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const pagination = new Pagination(page, limit);
    const options: FindOptions = {};

    if (query.orderBy) {
      options.order = {
        [query.orderBy]: query.sort === 'desc' ? 'desc' : 'asc',
      };
    }

    return await this.productsRepository.findBy(
      {
        name: query.search,
        priceMin: query.minPrice,
        priceMax: query.maxPrice,
      },
      pagination,
      options,
    );
  }
}
