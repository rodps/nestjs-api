import { EntityRepository } from '@mikro-orm/postgresql';
import { Admin } from '../entities/admin.entity';

export class AdminRepository extends EntityRepository<Admin> {}
