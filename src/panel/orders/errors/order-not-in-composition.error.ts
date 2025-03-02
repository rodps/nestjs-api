import { HttpException, HttpStatus } from '@nestjs/common';

export class OrderNotInCompositionError extends HttpException {
  constructor() {
    super('Order is not in composition', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
