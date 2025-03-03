import { Injectable } from '@nestjs/common';
import { StoreProductsRepository } from './store-products.repository';
import { Product } from 'src/common/entities/product.entity';

@Injectable()
export class StoreProductsService {
  constructor(private readonly productsRepository: StoreProductsRepository) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.findAll();
  }
}
