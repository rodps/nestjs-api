import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

export type AdminData = {
  id?: number;
  username: string;
  password: string;
  email: string;
};

@Entity()
export class Admin {
  @PrimaryKey()
  id: number;

  @Property()
  username: string;

  @Property({ hidden: true })
  password: string;

  @Property()
  email: string;

  constructor(data: AdminData) {
    Object.assign(this, data);
  }
}
