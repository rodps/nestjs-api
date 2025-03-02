import { IsNotEmpty } from 'class-validator';

export class CreateClienteDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @IsNotEmpty({ message: 'Telefone é obrigatório' })
  telefone: string;

  @IsNotEmpty({ message: 'Endereço é obrigatório' })
  endereco: string;
}
