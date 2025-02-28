import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  wrap,
} from '@mikro-orm/core';
import { Cliente } from '../../clientes/cliente.entity';
import { PedidoItem } from './pedido-item.entity';
import { PedidosRepository } from '../pedidos.repository';
import { PedidoNaoEstaEmComposicaoError } from '../errors/PedidoNaoEstaEmComposicao.error';

export enum PedidoStatus {
  EM_COMPOSICAO = 1,
  AGUARDANDO_PAGAMENTO = 2,
  PAGAMENTO_CONFIRMADO = 3,
  EM_TRANSPORTE = 4,
  ENTREGUE = 5,
  CANCELADO = 6,
}

const PEDIDO_STATUS_DESCRICAO = {
  [PedidoStatus.EM_COMPOSICAO]: 'Em composição',
  [PedidoStatus.AGUARDANDO_PAGAMENTO]: 'Aguardando pagamento',
  [PedidoStatus.PAGAMENTO_CONFIRMADO]: 'Pagamento confirmado',
  [PedidoStatus.EM_TRANSPORTE]: 'Em transporte',
  [PedidoStatus.ENTREGUE]: 'Entregue',
  [PedidoStatus.CANCELADO]: 'Cancelado',
};

@Entity({ repository: () => PedidosRepository })
export class Pedido {
  @PrimaryKey()
  id: number;

  @ManyToOne()
  cliente: Cliente;

  @OneToMany({
    entity: () => PedidoItem,
    mappedBy: 'pedido',
  })
  itens = new Collection<PedidoItem>(this);

  @Property()
  endereco: string;

  @Property({ columnType: 'numeric(10,2)' })
  valorTotal: number;

  @Property({
    type: 'enum',
    default: PedidoStatus.EM_COMPOSICAO,
  })
  status: PedidoStatus;

  @Property()
  dataPedido: Date = new Date();

  @Property({ nullable: true })
  dataEntrega: Date;

  @Property({ name: 'statusDescricao' })
  getStatusDescricao(): string {
    return PEDIDO_STATUS_DESCRICAO[this.status];
  }

  constructor(cliente: Cliente, endereco: string) {
    this.cliente = cliente;
    this.endereco = endereco;
    this.valorTotal = 0;
    this.status = PedidoStatus.EM_COMPOSICAO;
    this.dataPedido = new Date();
  }

  async addItem(item: PedidoItem): Promise<void> {
    if (this.status !== PedidoStatus.EM_COMPOSICAO) {
      throw new PedidoNaoEstaEmComposicaoError();
    }

    await this.loadItens();
    const itemExistente = this.buscarItemPorProdutoId(item.produto.id);

    if (itemExistente) {
      wrap(itemExistente).assign(item);
    } else {
      this.itens.add(item);
    }

    this.calcularValorTotal();
  }

  private async loadItens(): Promise<void> {
    await this.itens.load({
      populate: ['produto'],
    });
  }

  private buscarItemPorProdutoId(id: number): PedidoItem | undefined {
    return this.itens.getItems().find((i: PedidoItem) => i.produto.id === id);
  }

  private calcularValorTotal(): void {
    this.valorTotal = this.itens.getItems().reduce((total, item) => {
      return total + item.valorTotal;
    }, 0);
  }
}
