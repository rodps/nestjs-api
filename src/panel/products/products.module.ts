import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Product } from 'src/common/entities/product.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
