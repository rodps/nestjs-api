import { EntityManager, wrap } from '@mikro-orm/postgresql';
import { ConflictException, Injectable } from '@nestjs/common';
import { CustomersRepository } from '../../common/repositories/customers.repository';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CreateCustomerDto } from './dto/create-customer';
import { Customer } from '../../common/entities/customer.entity';
import { PasswordService } from 'src/common/services/password.service';

@Injectable()
export class CustomersService {
  constructor(
    private readonly customersRepository: CustomersRepository,
    private readonly passwordService: PasswordService,
    private readonly em: EntityManager,
  ) {}

  async create(data: CreateCustomerDto): Promise<Customer> {
    const exists = await this.customersRepository.findOne({
      email: data.email,
    });
    if (exists) {
      throw new ConflictException('Customer already registered');
    }
    const customer = this.em.create(Customer, {
      ...data,
      password: await this.passwordService.hashPassword(data.password),
    });
    await this.em.flush();
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    return this.customersRepository.findAll();
  }

  async findOne(id: number): Promise<Customer> {
    return this.customersRepository.findOneOrFail(id);
  }

  async update(id: number, data: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.customersRepository.findOneOrFail(id);
    const emailExists = await this.customersRepository.findOne({
      email: data.email,
      id: { $ne: id },
    });
    if (emailExists) {
      throw new ConflictException('This email is already in use');
    }
    wrap(customer).assign(data, { ignoreUndefined: true });
    await this.em.flush();
    return customer;
  }

  async remove(id: number): Promise<void> {
    const customer = await this.customersRepository.findOneOrFail(id);
    await this.em.removeAndFlush(customer);
  }
}
