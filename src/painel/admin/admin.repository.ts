import { EntityRepository } from '@mikro-orm/postgresql';
import { Admin } from './admin.entity';

export class AdminRepository extends EntityRepository<Admin> {}
