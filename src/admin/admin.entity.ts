import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { AdminRepository } from './admin.repository';

@Entity({ repository: () => AdminRepository })
export class Admin {
  @PrimaryKey()
  id: number;

  @Property()
  username: string;

  @Property()
  password: string;

  @Property()
  email: string;

  [EntityRepositoryType]?: AdminRepository;
}
