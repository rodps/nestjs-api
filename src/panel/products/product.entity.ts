import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ProductsRepository } from './products.repository';

@Entity({ repository: () => ProductsRepository })
export class Product {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property({ type: 'double' })
  price: number;

  @Property()
  stock: number;

  constructor(data: {
    id?: number;
    name: string;
    price: number;
    stock: number;
  }) {
    Object.assign(this, data);
  }
}
