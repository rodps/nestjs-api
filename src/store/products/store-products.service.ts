import { Injectable } from '@nestjs/common';
import { Product } from 'src/common/entities/product.entity';
import { ProductsRepository } from 'src/common/repositories/products.repository';
import { FindAllDto } from './dto/find-all.dto';
import { Pagination } from 'src/common/pagination';
import { Page } from 'src/common/page';

@Injectable()
export class StoreProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async findAll(query: FindAllDto): Promise<Page<Product>> {
    const filters = {
      name: query.search,
      priceMin: query.minPrice,
      priceMax: query.maxPrice,
    };
    const pagination = new Pagination({
      page: query.page || 1,
      limit: query.limit || 10,
    });
    const options = {
      orderBy: query.orderBy,
      sort: query.sort,
    };

    return await this.productsRepository.findBy(filters, pagination, options);
  }
}
