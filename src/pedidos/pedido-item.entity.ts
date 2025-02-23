import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Pedido } from './pedido.entity';
import { Produto } from '../produtos/produto.entity';

@Entity()
export class PedidoItem {
  @PrimaryKey()
  id: number;

  @ManyToOne({ entity: () => Pedido, deleteRule: 'cascade' })
  pedido: Pedido;

  @ManyToOne()
  produto: Produto;

  @Property()
  quantidade: number;

  @Property()
  valorUnitario: number;

  @Property()
  valorTotal: number;

  constructor(pedido: Pedido, produto: Produto, quantidade: number) {
    this.pedido = pedido;
    this.produto = produto;
    this.quantidade = quantidade;
    this.valorUnitario = produto.preco;
    this.valorTotal = quantidade * produto.preco;
  }
}
