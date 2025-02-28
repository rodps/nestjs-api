import { Cliente } from 'src/clientes/cliente.entity';
import { Pedido, PedidoStatus } from '../entities/pedido.entity';
import { Produto } from 'src/produtos/produto.entity';
import { PedidoItem } from '../entities/pedido-item.entity';
import { Test } from '@nestjs/testing';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from '../../mikro-orm.config';
import { PedidoNaoEstaEmComposicaoError } from '../errors/PedidoNaoEstaEmComposicao.error';

describe('PedidoEntity', () => {
  const cliente = new Cliente({
    id: 1,
    nome: 'Cliente 1',
    email: 'cliente@mail.com',
    telefone: '999999999',
    endereco: 'Rua 1',
  });

  const produto = new Produto({
    id: 1,
    nome: 'Produto 1',
    preco: 10,
    estoque: 10,
  });

  beforeEach(async () => {
    await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot({
          ...config,
          connect: false,
          debug: false,
        }),
      ],
    }).compile();
  });
  it('should create a new pedido with correct values', () => {
    const pedido = new Pedido(cliente, 'Rua 1');

    expect(pedido.cliente).toBe(cliente);
    expect(pedido.endereco).toBe('Rua 1');
    expect(pedido.valorTotal).toBe(0);
    expect(pedido.status).toBe(PedidoStatus.EM_COMPOSICAO);
    expect(pedido.dataPedido).toBeInstanceOf(Date);
    expect(pedido.dataEntrega).toBeFalsy();
  });

  describe('addItem', () => {
    it('should add an item', async () => {
      const pedido = new Pedido(cliente, 'Rua 1');
      const pedidoItem = new PedidoItem(pedido, produto, 1);

      await pedido.addItem(pedidoItem);

      expect(pedido.itens.length).toBe(1);
      expect(pedido.itens[0]).toBe(pedidoItem);
      expect(pedido.valorTotal).toBe(10);
    });

    it('should throw an error if PedidoStatus is not EM_COMPOSICAO', async () => {
      const pedido = new Pedido(cliente, 'Rua 1');
      pedido.status = PedidoStatus.AGUARDANDO_PAGAMENTO;
      const pedidoItem = new PedidoItem(pedido, produto, 1);

      await expect(pedido.addItem(pedidoItem)).rejects.toThrow(
        PedidoNaoEstaEmComposicaoError,
      );
    });

    it('should replace the item if it already exists', async () => {
      const pedido = new Pedido(cliente, 'Rua 1');
      const pedidoItem = new PedidoItem(pedido, produto, 1);
      await pedido.addItem(pedidoItem);

      const pedidoItem2 = new PedidoItem(pedido, produto, 2);
      await pedido.addItem(pedidoItem2);

      expect(pedido.itens.length).toBe(1);
      expect(pedido.itens[0]).toEqual(pedidoItem2);
      expect(pedido.valorTotal).toBe(20);
    });
  });
});
