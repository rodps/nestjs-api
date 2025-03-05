import { Customer } from 'src/common/entities/customer.entity';
import { Order, OrderStatus } from '../order.entity';
import { Product } from 'src/common/entities/product.entity';
import { OrderItem } from '../order-item.entity';
import { Test } from '@nestjs/testing';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from '../../../mikro-orm.config';
import { OrderNotInCompositionError } from '../errors/order-not-in-composition.error';

describe('OrderEntity', () => {
  const customer = new Customer({
    id: 1,
    name: 'Customer 1',
    email: 'customer@mail.com',
    phone: '999999999',
    address: 'Street 1',
  });

  const product = new Product({
    id: 1,
    name: 'Product 1',
    price: 10,
    stock: 10,
  });

  beforeEach(async () => {
    await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot({
          ...config,
          connect: false,
          debug: false,
        }),
      ],
    }).compile();
  });

  it('should create a new order with correct values', () => {
    const order = new Order(customer, 'Street 1');

    expect(order.customer).toBe(customer);
    expect(order.address).toBe('Street 1');
    expect(order.totalValue).toBe(0);
    expect(order.status).toBe(OrderStatus.IN_PROGRESS);
    expect(order.orderDate).toBeInstanceOf(Date);
    expect(order.deliveryDate).toBeFalsy();
  });

  describe('addItem', () => {
    it('should add an item', async () => {
      const order = new Order(customer, 'Street 1');
      const orderItem = new OrderItem(order, product, 1);

      await order.addItem(orderItem);

      expect(order.items.length).toBe(1);
      expect(order.items[0]).toBe(orderItem);
      expect(order.totalValue).toBe(10);
    });

    it('should throw an error if OrderStatus is not IN_PROGRESS', async () => {
      const order = new Order(customer, 'Street 1');
      order.status = OrderStatus.AWAITING_PAYMENT;
      const orderItem = new OrderItem(order, product, 1);

      await expect(order.addItem(orderItem)).rejects.toThrow(
        OrderNotInCompositionError,
      );
    });

    it('should replace the item if it already exists', async () => {
      const order = new Order(customer, 'Street 1');
      const orderItem = new OrderItem(order, product, 1);
      await order.addItem(orderItem);

      const orderItem2 = new OrderItem(order, product, 2);
      await order.addItem(orderItem2);

      expect(order.items.length).toBe(1);
      expect(order.items[0]).toEqual(orderItem2);
      expect(order.totalValue).toBe(20);
    });
  });
});
