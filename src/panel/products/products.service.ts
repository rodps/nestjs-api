import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './product.entity';
import { EntityManager, wrap } from '@mikro-orm/postgresql';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductsRepository,
    private readonly em: EntityManager,
  ) {}

  async createProduct(data: CreateProductDto): Promise<Product> {
    const product = this.em.create(Product, data);
    await this.em.flush();
    return product;
  }

  async getProducts(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async getProductById(id: number): Promise<Product> {
    return this.productRepository.findOneOrFail(id);
  }

  async updateProduct(id: number, data: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.findOneOrFail(id);
    wrap(product).assign(data, { ignoreUndefined: true });
    await this.em.flush();
    return product;
  }

  async deleteProduct(id: number): Promise<void> {
    const product = await this.productRepository.findOneOrFail(id);
    await this.em.removeAndFlush(product);
  }
}
