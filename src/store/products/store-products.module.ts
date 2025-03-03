import { Module } from '@nestjs/common';
import { StoreProductsController } from './store-products.controller';
import { StoreProductsService } from './store-products.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Product } from 'src/common/entities/product.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Product])],
  controllers: [StoreProductsController],
  providers: [StoreProductsService],
  exports: [],
})
export class StoreProductsModule {}
