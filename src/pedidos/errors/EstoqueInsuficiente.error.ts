import { HttpException, HttpStatus } from '@nestjs/common';

export class EstoqueInsuficienteError extends HttpException {
  constructor() {
    super('Estoque insuficiente', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
