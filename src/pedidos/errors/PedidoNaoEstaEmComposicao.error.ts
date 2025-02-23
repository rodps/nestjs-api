export class PedidoNaoEstaEmComposicaoError extends Error {
  constructor() {
    super('Pedido não está em composicao');
  }
}
