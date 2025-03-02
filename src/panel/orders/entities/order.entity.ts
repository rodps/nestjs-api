import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  wrap,
} from '@mikro-orm/core';
import { Customer } from '../../customers/customer.entity';
import { OrderItem } from './order-item.entity';
import { OrdersRepository } from '../orders.repository';
import { OrderNotInCompositionError } from '../errors/order-not-in-composition.error';

export enum OrderStatus {
  IN_PROGRESS = 1,
  AWAITING_PAYMENT = 2,
  PAYMENT_CONFIRMED = 3,
  IN_TRANSIT = 4,
  DELIVERED = 5,
  CANCELED = 6,
}

const ORDER_STATUS_DESCRIPTION = {
  [OrderStatus.IN_PROGRESS]: 'In progress',
  [OrderStatus.AWAITING_PAYMENT]: 'Awaiting payment',
  [OrderStatus.PAYMENT_CONFIRMED]: 'Payment confirmed',
  [OrderStatus.IN_TRANSIT]: 'In transit',
  [OrderStatus.DELIVERED]: 'Delivered',
  [OrderStatus.CANCELED]: 'Canceled',
};

@Entity({ repository: () => OrdersRepository })
export class Order {
  @PrimaryKey()
  id: number;

  @ManyToOne()
  customer: Customer;

  @OneToMany({
    entity: () => OrderItem,
    mappedBy: 'order',
  })
  items = new Collection<OrderItem>(this);

  @Property()
  address: string;

  @Property({ columnType: 'numeric(10,2)' })
  totalValue: number;

  @Property({
    type: 'enum',
    default: OrderStatus.IN_PROGRESS,
  })
  status: OrderStatus;

  @Property()
  orderDate: Date = new Date();

  @Property({ nullable: true })
  deliveryDate: Date;

  @Property({ name: 'statusDescription' })
  getStatusDescription(): string {
    return ORDER_STATUS_DESCRIPTION[this.status];
  }

  constructor(customer: Customer, address: string) {
    this.customer = customer;
    this.address = address;
    this.totalValue = 0;
    this.status = OrderStatus.IN_PROGRESS;
    this.orderDate = new Date();
  }

  async addItem(item: OrderItem): Promise<void> {
    if (this.status !== OrderStatus.IN_PROGRESS) {
      throw new OrderNotInCompositionError();
    }

    await this.loadItems();
    const existingItem = this.findItemByProductId(item.product.id);

    if (existingItem) {
      wrap(existingItem).assign(item);
    } else {
      this.items.add(item);
    }

    this.calculateTotalValue();
  }

  private async loadItems(): Promise<void> {
    await this.items.load({
      populate: ['product'],
    });
  }

  private findItemByProductId(id: number): OrderItem | undefined {
    return this.items.getItems().find((i: OrderItem) => i.product.id === id);
  }

  private calculateTotalValue(): void {
    this.totalValue = this.items
      .getItems()
      .reduce((total: number, item: OrderItem) => {
        return total + item.totalPrice;
      }, 0);
  }
}
