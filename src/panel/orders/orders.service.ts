import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Order } from '../../common/entities/order.entity';
import { OrderItem } from '../../common/entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersRepository } from './orders.repository';
import { CustomersRepository } from 'src/panel/customers/customers.repository';
import { ProductsRepository } from 'src/panel/products/products.repository';
import { OrderItemDto } from './dto/order-item.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly customersRepository: CustomersRepository,
    private readonly productsRepository: ProductsRepository,
    private readonly em: EntityManager,
  ) {}

  async create(data: CreateOrderDto): Promise<Order> {
    const customer = await this.findCustomer(data.customerId);
    const order = new Order(customer, data.address);

    for (const orderItem of data.items) {
      const product = await this.findProduct(orderItem.productId);
      const item = new OrderItem(order, product, orderItem.quantity);
      await order.addItem(item);
    }

    await this.em.persistAndFlush(order);
    return order;
  }

  async updateItems(id: number, item: OrderItemDto): Promise<Order> {
    const order = await this.ordersRepository.findOneOrFail(id);
    const product = await this.findProduct(item.productId);

    await order.addItem(new OrderItem(order, product, item.quantity));

    await this.em.flush();
    return order;
  }

  async findAll(): Promise<Order[]> {
    return await this.ordersRepository.findAll();
  }

  async findOne(id: number): Promise<Order> {
    return await this.ordersRepository.findOneOrFail(id, {
      populate: ['customer', 'items.product'],
    });
  }

  async update(id: number, order: UpdateOrderDto): Promise<Order> {
    const existingOrder = await this.ordersRepository.findOneOrFail(id);
    this.em.assign(existingOrder, order, {
      ignoreUndefined: true,
    });
    await this.em.flush();
    return existingOrder;
  }

  async remove(id: number): Promise<void> {
    const order = await this.ordersRepository.findOneOrFail(id);
    await this.em.removeAndFlush(order);
  }

  private async findCustomer(id: number) {
    return await this.customersRepository.findOneOrFail(id, {
      failHandler: () => {
        throw new UnprocessableEntityException(`Customer ${id} not found`);
      },
    });
  }

  private async findProduct(id: number) {
    return await this.productsRepository.findOneOrFail(id, {
      failHandler: () => {
        throw new UnprocessableEntityException(`Product ${id} not found`);
      },
    });
  }
}
