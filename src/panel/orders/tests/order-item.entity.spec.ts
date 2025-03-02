import { Customer } from 'src/panel/customers/customer.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Order } from '../entities/order.entity';
import { Product } from 'src/panel/products/product.entity';
import { QuantityZeroError } from '../errors/quantity-zero.error';
import { InsufficientStockError } from '../errors/insufficient-stock.error';

describe('OrderItemEntity', () => {
  const customer = new Customer({
    id: 1,
    name: 'Customer 1',
    email: 'customer@mail.com',
    phone: '999999999',
    address: 'Street 1',
  });

  const order = new Order(customer, 'Street 1');

  const product = new Product({
    id: 1,
    name: 'Product 1',
    price: 10,
    stock: 10,
  });

  it('should create a new instance with correct values', () => {
    const orderItem = new OrderItem(order, product, 1);

    expect(orderItem.order).toBe(order);
    expect(orderItem.product).toBe(product);
    expect(orderItem.quantity).toBe(1);
    expect(orderItem.unitPrice).toBe(product.price);
    expect(orderItem.totalPrice).toBe(product.price);

    const orderItem2 = new OrderItem(order, product, 2);

    expect(orderItem2.order).toBe(order);
    expect(orderItem2.product).toBe(product);
    expect(orderItem2.quantity).toBe(2);
    expect(orderItem2.unitPrice).toBe(product.price);
    expect(orderItem2.totalPrice).toBe(product.price * 2);
  });

  it('should throw an error if quantity is less than or equal to 0', () => {
    expect(() => {
      new OrderItem(order, product, 0);
    }).toThrow(QuantityZeroError);

    expect(() => {
      new OrderItem(order, product, -1);
    }).toThrow(QuantityZeroError);
  });

  it('should throw an error if quantity is greater than stock', () => {
    expect(() => {
      new OrderItem(order, product, 11);
    }).toThrow(InsufficientStockError);
  });
});
