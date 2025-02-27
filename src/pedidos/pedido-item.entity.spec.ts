import { Cliente } from 'src/clientes/cliente.entity';
import { PedidoItem } from './pedido-item.entity';
import { Pedido } from './pedido.entity';
import { Produto } from 'src/produtos/produto.entity';
import { QuantidadeZeroError } from './errors/QuantidadeZeroError';
import { EstoqueInsuficienteError } from './errors/EstoqueInsuficiente.error';

describe('PedidoItemEntity', () => {
  const cliente = new Cliente({
    id: 1,
    nome: 'Cliente 1',
    email: 'cliente@mail.com',
    telefone: '999999999',
    endereco: 'Rua 1',
  });

  const pedido = new Pedido(cliente, 'Rua 1');

  const produto = new Produto({
    id: 1,
    nome: 'Produto 1',
    preco: 10,
    estoque: 10,
  });

  it('should create a new instance with correct values', () => {
    const pedidoItem = new PedidoItem(pedido, produto, 1);

    expect(pedidoItem.pedido).toBe(pedido);
    expect(pedidoItem.produto).toBe(produto);
    expect(pedidoItem.quantidade).toBe(1);
    expect(pedidoItem.valorUnitario).toBe(produto.preco);
    expect(pedidoItem.valorTotal).toBe(produto.preco);

    const pedidoItem2 = new PedidoItem(pedido, produto, 2);

    expect(pedidoItem2.pedido).toBe(pedido);
    expect(pedidoItem2.produto).toBe(produto);
    expect(pedidoItem2.quantidade).toBe(2);
    expect(pedidoItem2.valorUnitario).toBe(produto.preco);
    expect(pedidoItem2.valorTotal).toBe(produto.preco * 2);
  });

  it('should throw an error if quantidade is less than or equal to 0', () => {
    expect(() => {
      new PedidoItem(pedido, produto, 0);
    }).toThrow(QuantidadeZeroError);

    expect(() => {
      new PedidoItem(pedido, produto, -1);
    }).toThrow(QuantidadeZeroError);
  });

  it('should throw an error if quantidade is greater than estoque', () => {
    expect(() => {
      new PedidoItem(pedido, produto, 11);
    }).toThrow(EstoqueInsuficienteError);
  });
});
