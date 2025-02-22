import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ClientesRepository } from './clientes.repository';

@Entity({ repository: () => ClientesRepository })
export class Cliente {
  @PrimaryKey()
  id: number;

  @Property()
  nome: string;

  @Property({ unique: true })
  email: string;

  @Property()
  telefone: string;

  @Property()
  endereco: string;
}
