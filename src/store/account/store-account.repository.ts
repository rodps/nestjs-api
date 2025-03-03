import { EntityRepository } from '@mikro-orm/postgresql';
import { Customer } from '../../common/entities/customer.entity';

export class StoreAccountRepository extends EntityRepository<Customer> {}
