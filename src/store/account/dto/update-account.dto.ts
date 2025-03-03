import { IsNotEmpty } from 'class-validator';

export class UpdateCustomerDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNotEmpty({ message: 'Phone is required' })
  phone: string;

  @IsNotEmpty({ message: 'Address is required' })
  address: string;
}
