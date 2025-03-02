import { HttpException, HttpStatus } from '@nestjs/common';

export class InsufficientStockError extends HttpException {
  constructor() {
    super('Insufficient stock', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
