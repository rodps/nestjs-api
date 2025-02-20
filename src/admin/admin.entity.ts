import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Admin {
  @PrimaryKey()
  id: number;

  @Property()
  username: string;

  @Property()
  password: string;

  @Property()
  email: string;
}
