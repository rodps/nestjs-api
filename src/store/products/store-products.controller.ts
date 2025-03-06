import { Controller, Get, Query } from '@nestjs/common';
import { StoreProductsService } from './store-products.service';
import { FindAllDto } from './dto/find-all.dto';

@Controller()
export class StoreProductsController {
  constructor(private readonly productsService: StoreProductsService) {}

  @Get()
  async findAll(@Query() query: FindAllDto) {
    return await this.productsService.findAll(query);
  }
}
