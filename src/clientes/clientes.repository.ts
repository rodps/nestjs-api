import { EntityRepository } from '@mikro-orm/postgresql';
import { Cliente } from './cliente.entity';

export class ClientesRepository extends EntityRepository<Cliente> {}
