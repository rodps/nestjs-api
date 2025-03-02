import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { InsufficientStockError } from '../../panel/orders/errors/insufficient-stock.error';
import { QuantityZeroError } from '../../panel/orders/errors/quantity-zero.error';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity()
export class OrderItem {
  @PrimaryKey()
  id: number;

  @ManyToOne({ entity: () => Order, deleteRule: 'cascade' })
  order: Order;

  @ManyToOne()
  product: Product;

  @Property()
  quantity: number;

  @Property({ columnType: 'numeric(10,2)' })
  unitPrice: number;

  @Property({ columnType: 'numeric(10,2)' })
  totalPrice: number;

  constructor(order: Order, product: Product, quantity: number) {
    if (quantity <= 0) {
      throw new QuantityZeroError();
    }
    if (quantity > product.stock) {
      throw new InsufficientStockError();
    }
    this.order = order;
    this.product = product;
    this.quantity = quantity;
    this.unitPrice = product.price;
    this.totalPrice = quantity * product.price;
  }
}
