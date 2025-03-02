import { HttpException, HttpStatus } from '@nestjs/common';

export class QuantidadeZeroError extends HttpException {
  constructor() {
    super(
      'Quantidade deve ser maior que zero',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
