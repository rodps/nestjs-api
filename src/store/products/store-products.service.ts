import { Injectable } from '@nestjs/common';
import { Product } from 'src/common/entities/product.entity';
import { ProductsRepository } from 'src/common/repositories/products.repository';

@Injectable()
export class StoreProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.findAll();
  }
}
