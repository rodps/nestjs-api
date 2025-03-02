import { IsNotEmpty } from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty({ message: 'The name field is required' })
  name: string;

  @IsNotEmpty({ message: 'The price field is required' })
  price: number;

  @IsNotEmpty({ message: 'The stock field is required' })
  stock: number;
}
