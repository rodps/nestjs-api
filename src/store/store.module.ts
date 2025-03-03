import { Module } from '@nestjs/common';
import { StoreProductsModule } from './products/store-products.module';
import { RouterModule } from '@nestjs/core';
import { StoreAccountModule } from './account/store-account.module';
import { StoreAuthModule } from './auth/store-auth.module';

@Module({
  imports: [
    StoreAccountModule,
    StoreAuthModule,
    StoreProductsModule,
    RouterModule.register([
      {
        path: 'store',
        children: [
          {
            path: 'account',
            module: StoreAccountModule,
          },
          {
            path: 'auth',
            module: StoreAuthModule,
          },
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
