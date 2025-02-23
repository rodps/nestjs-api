import { HttpException, HttpStatus } from '@nestjs/common';

export class PedidoNaoEstaEmComposicaoError extends HttpException {
  constructor() {
    super('Pedido não está em composicao', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
