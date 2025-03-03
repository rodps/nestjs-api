import { Module } from '@nestjs/common';
import { StoreProductsController } from './store-products.controller';
import { StoreProductsService } from './store-products.service';
import { StoreProductsRepository } from './store-products.repository';

@Module({
  controllers: [StoreProductsController],
  providers: [StoreProductsService, StoreProductsRepository],
  exports: [],
})
export class StoreProductsModule {}
