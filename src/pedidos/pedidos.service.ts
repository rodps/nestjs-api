import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Pedido } from './entities/pedido.entity';
import { PedidoItem } from './entities/pedido-item.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { PedidosRepository } from './pedidos.repository';
import { ClientesRepository } from 'src/clientes/clientes.repository';
import { ProdutoRepository } from 'src/produtos/produto.repository';
import { PedidoItemDto } from './dto/pedido-item.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Injectable()
export class PedidosService {
  constructor(
    private readonly pedidosRepository: PedidosRepository,
    private readonly clientesRepository: ClientesRepository,
    private readonly produtosRepository: ProdutoRepository,
    private readonly em: EntityManager,
  ) {}

  async create(pedido: CreatePedidoDto): Promise<Pedido> {
    const cliente = await this.findCliente(pedido.clienteId);
    const novoPedido = new Pedido(cliente, pedido.endereco);

    for (const pedidoItem of pedido.itens) {
      const produto = await this.findProduto(pedidoItem.produtoId);
      const item = new PedidoItem(novoPedido, produto, pedidoItem.quantidade);
      await novoPedido.addItem(item);
    }

    await this.em.persistAndFlush(novoPedido);
    return novoPedido;
  }

  async updateItens(id: number, item: PedidoItemDto): Promise<Pedido> {
    const pedido = await this.pedidosRepository.findOneOrFail(id);
    const produto = await this.findProduto(item.produtoId);

    await pedido.addItem(new PedidoItem(pedido, produto, item.quantidade));

    await this.em.flush();
    return pedido;
  }

  async findAll(): Promise<Pedido[]> {
    return await this.pedidosRepository.findAll();
  }

  async findOne(id: number): Promise<Pedido> {
    return await this.pedidosRepository.findOneOrFail(id, {
      populate: ['cliente', 'itens.produto'],
    });
  }

  async update(id: number, pedido: UpdatePedidoDto): Promise<Pedido> {
    const existingPedido = await this.pedidosRepository.findOneOrFail(id);
    this.em.assign(existingPedido, pedido, {
      ignoreUndefined: true,
    });
    await this.em.flush();
    return existingPedido;
  }

  async remove(id: number): Promise<void> {
    const pedido = await this.pedidosRepository.findOneOrFail(id);
    await this.em.removeAndFlush(pedido);
  }

  private async findCliente(id: number) {
    return await this.clientesRepository.findOneOrFail(id, {
      failHandler: () => {
        throw new UnprocessableEntityException(`Cliente ${id} nao encontrado`);
      },
    });
  }

  private async findProduto(id: number) {
    return await this.produtosRepository.findOneOrFail(id, {
      failHandler: () => {
        throw new UnprocessableEntityException(`Produto ${id} nao encontrado`);
      },
    });
  }
}
