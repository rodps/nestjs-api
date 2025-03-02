import { EntityRepository } from '@mikro-orm/postgresql';
import { Customer } from './customer.entity';

export class CustomersRepository extends EntityRepository<Customer> {}
