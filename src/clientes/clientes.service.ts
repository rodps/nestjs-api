import { EntityManager, wrap } from '@mikro-orm/postgresql';
import { ConflictException, Injectable } from '@nestjs/common';
import { ClientesRepository } from './clientes.repository';
import { Cliente } from './cliente.entity';

@Injectable()
export class ClientesService {
  constructor(
    private readonly clientesRepository: ClientesRepository,
    private readonly em: EntityManager,
  ) {}

  async create(data: Cliente): Promise<void> {
    const exists = await this.clientesRepository.findOne({ email: data.email });
    if (exists) {
      throw new ConflictException('Cliente já cadastrado');
    }
    await this.em.persistAndFlush(data);
  }

  async findAll(): Promise<Cliente[]> {
    return this.clientesRepository.findAll();
  }

  async findOne(id: number): Promise<Cliente> {
    return this.clientesRepository.findOneOrFail(id);
  }

  async update(id: number, data: Cliente): Promise<Cliente> {
    const cliente = await this.clientesRepository.findOneOrFail(id);
    wrap(cliente).assign(data, { ignoreUndefined: true });
    await this.em.flush();
    return cliente;
  }

  async remove(id: number): Promise<void> {
    const cliente = await this.clientesRepository.findOneOrFail(id);
    await this.em.removeAndFlush(cliente);
  }
}
