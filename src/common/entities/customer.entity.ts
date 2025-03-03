import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { CustomersRepository } from '../repositories/customers.repository';

@Entity({ repository: () => CustomersRepository })
export class Customer {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property({ unique: true })
  email: string;

  @Property({ hidden: true })
  password: string;

  @Property()
  phone: string;

  @Property()
  address: string;

  constructor(data: {
    id?: number;
    name: string;
    email: string;
    phone: string;
    address: string;
  }) {
    Object.assign(this, data);
  }
}
