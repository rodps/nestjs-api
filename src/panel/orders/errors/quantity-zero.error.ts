import { HttpException, HttpStatus } from '@nestjs/common';

export class QuantityZeroError extends HttpException {
  constructor() {
    super(
      'Quantity must be greater than zero',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
