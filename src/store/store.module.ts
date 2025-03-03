import { Module } from '@nestjs/common';
import { StoreProductsModule } from './products/store-products.module';
import { RouterModule } from '@nestjs/core';
import { StoreAccountModule } from './account/store-account.module';

@Module({
  imports: [
    StoreProductsModule,
    StoreAccountModule,
    RouterModule.register([
      {
        path: 'store',
        children: [
          {
            path: 'products',
            module: StoreProductsModule,
          },
          {
            path: 'account',
            module: StoreAccountModule,
          },
        ],
      },
    ]),
  ],
})
export class StoreModule {}
