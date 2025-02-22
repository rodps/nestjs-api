import { Cliente } from '../cliente.entity';

export class ClienteDto {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;

  static fromEntity(cliente: Cliente) {
    const clienteDto = new ClienteDto();
    clienteDto.id = cliente.id;
    clienteDto.nome = cliente.nome;
    clienteDto.email = cliente.email;
    clienteDto.telefone = cliente.telefone;
    clienteDto.endereco = cliente.endereco;
    return clienteDto;
  }
}
