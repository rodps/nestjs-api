import { IsNotEmpty } from 'class-validator';
import { Cliente } from '../cliente.entity';

export class CreateClienteDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @IsNotEmpty({ message: 'Telefone é obrigatório' })
  telefone: string;

  @IsNotEmpty({ message: 'Endereço é obrigatório' })
  endereco: string;

  toEntity() {
    const cliente = new Cliente();
    cliente.nome = this.nome;
    cliente.email = this.email;
    cliente.telefone = this.telefone;
    cliente.endereco = this.endereco;
    return cliente;
  }
}
