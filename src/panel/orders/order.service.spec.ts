/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { OrdersRepository } from '../../common/repositories/orders.repository';
import { CustomersRepository } from 'src/common/repositories/customers.repository';
import { ProductsRepository } from 'src/common/repositories/products.repository';
import { EntityManager } from '@mikro-orm/postgresql';
import { Product } from 'src/common/entities/product.entity';
import { Customer } from 'src/common/entities/customer.entity';
import { Order } from '../../common/entities/order.entity';
import { OrderItem } from '../../common/entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';

const orderMock = {
  id: 1,
  addItem: jest.fn(),
};
jest.mock('src/common/entities/order.entity', () => {
  return {
    Order: jest.fn().mockImplementation(() => orderMock),
  };
});

const orderItemMock = {
  id: 1,
};
jest.mock('src/common/entities/order-item.entity', () => {
  return {
    OrderItem: jest.fn().mockImplementation(() => orderItemMock),
  };
});

describe('OrdersService', () => {
  let ordersService: OrdersService;
  let entityManager: EntityManager;
  let customersRepository: CustomersRepository;
  let productsRepository: ProductsRepository;

  const customer = new Customer({
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '999999999',
    address: 'Street 1',
  });

  const order = new Order(customer, 'Street 2');

  const product = new Product({
    id: 1,
    name: 'Product 1',
    price: 10,
    stock: 10,
  });

  const dto: CreateOrderDto = {
    customerId: 1,
    address: 'Street 2',
    items: [
      {
        productId: 1,
        quantity: 1,
      },
    ],
  };

  const mockOrdersRepository = {
    findAll: jest.fn(() => [order]),
    findOne: jest.fn(() => order),
    findOneOrFail: jest.fn(() => order),
  };

  const mockCustomersRepository = {
    findOne: jest.fn(() => customer),
    findOneOrFail: jest.fn(() => customer),
  };

  const mockProductsRepository = {
    findOne: jest.fn(() => product),
    findOneOrFail: jest.fn(() => product),
  };

  const mockEntityManager = {
    persistAndFlush: jest.fn(),
    flush: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: OrdersRepository,
          useValue: mockOrdersRepository,
        },
        {
          provide: CustomersRepository,
          useValue: mockCustomersRepository,
        },
        {
          provide: ProductsRepository,
          useValue: mockProductsRepository,
        },
        {
          provide: EntityManager,
          useValue: mockEntityManager,
        },
      ],
    }).compile();

    ordersService = module.get<OrdersService>(OrdersService);
    entityManager = module.get<EntityManager>(EntityManager);
    customersRepository = module.get<CustomersRepository>(CustomersRepository);
    productsRepository = module.get<ProductsRepository>(ProductsRepository);
  });

  describe('create', () => {
    it('should call Order with correct arguments', async () => {
      await ordersService.create(dto);

      expect(Order).toHaveBeenCalledWith(customer, dto.address);
    });

    it('should call OrderItem with correct arguments', async () => {
      await ordersService.create(dto);

      expect(OrderItem).toHaveBeenCalledWith(orderMock, product, 1);
    });

    it('should call Order.addItem with correct arguments', async () => {
      await ordersService.create(dto);

      expect(orderMock.addItem).toHaveBeenCalledWith(orderItemMock);
    });

    it('should call entityManager.persistAndFlush with correct arguments', async () => {
      await ordersService.create(dto);

      expect(entityManager.persistAndFlush).toHaveBeenCalledWith(orderMock);
    });

    it('should throw an error if Customer is not found', async () => {
      jest
        .spyOn(customersRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      await expect(ordersService.create(dto)).rejects.toThrow();
    });

    it('should throw an error if Product is not found', async () => {
      jest
        .spyOn(productsRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      await expect(ordersService.create(dto)).rejects.toThrow();
    });
  });
});
