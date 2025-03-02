import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    AdminModule,
    AuthModule,
    ProductsModule,
    CustomersModule,
    OrdersModule,
    RouterModule.register([
      {
        path: 'panel',
        children: [
          { path: 'admin', module: AdminModule },
          { path: 'auth', module: AuthModule },
          { path: 'products', module: ProductsModule },
          { path: 'customers', module: CustomersModule },
          { path: 'orders', module: OrdersModule },
        ],
      },
    ]),
  ],
})
export class PanelModule {}
