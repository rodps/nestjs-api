import { EntityRepository } from '@mikro-orm/postgresql';
import { Customer } from '../entities/customer.entity';

export class CustomersRepository extends EntityRepository<Customer> {}
