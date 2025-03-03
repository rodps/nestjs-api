import { Module } from '@nestjs/common';
import { StoreProductsModule } from './products/store-products.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    StoreProductsModule,
    RouterModule.register([
      {
        path: 'store',
        children: [
          {
            path: 'products',
            module: StoreProductsModule,
          },
        ],
      },
    ]),
  ],
})
export class StoreModule {}
