import { EntityManager, wrap } from '@mikro-orm/postgresql';
import { ConflictException, Injectable } from '@nestjs/common';
import { StoreAccountRepository } from './store-account.repository';
import { UpdateCustomerDto } from './dto/update-account.dto';
import { CreateAccountDto } from './dto/create-account.dto';
import { Customer } from '../../common/entities/customer.entity';
import { PasswordService } from 'src/common/services/password.service';

@Injectable()
export class StoreAccountService {
  constructor(
    private readonly accountRepository: StoreAccountRepository,
    private readonly passwordService: PasswordService,
    private readonly em: EntityManager,
  ) {}

  async create(data: CreateAccountDto): Promise<Customer> {
    const exists = await this.accountRepository.findOne({
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

  async findOne(id: number): Promise<Customer> {
    return this.accountRepository.findOneOrFail(id);
  }

  async update(id: number, data: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.accountRepository.findOneOrFail(id);
    const emailExists = await this.accountRepository.findOne({
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
    const customer = await this.accountRepository.findOneOrFail(id);
    await this.em.removeAndFlush(customer);
  }
}
