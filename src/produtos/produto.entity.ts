import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ProdutoRepository } from './produto.repository';

@Entity({ repository: () => ProdutoRepository })
export class Produto {
  @PrimaryKey()
  id: number;

  @Property()
  nome: string;

  @Property({ type: 'double' })
  preco: number;

  @Property()
  estoque: number;
}
