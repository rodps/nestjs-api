import { EntityRepository } from '@mikro-orm/postgresql';
import { Produto } from './produto.entity';

export class ProdutoRepository extends EntityRepository<Produto> {}
