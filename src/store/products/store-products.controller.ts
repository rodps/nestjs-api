import { Controller, Get } from '@nestjs/common';
import { StoreProductsService } from './store-products.service';

@Controller()
export class StoreProductsController {
  constructor(private readonly productsService: StoreProductsService) {}

  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }
}
