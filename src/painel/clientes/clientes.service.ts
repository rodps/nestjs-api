import { EntityManager, wrap } from '@mikro-orm/postgresql';
import { ConflictException, Injectable } from '@nestjs/common';
import { ClientesRepository } from './clientes.repository';
import { Cliente } from './cliente.entity';
import { CreateClienteDto } from './dto/crate-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    private readonly clientesRepository: ClientesRepository,
    private readonly em: EntityManager,
  ) {}

  async create(data: CreateClienteDto): Promise<Cliente> {
    const exists = await this.clientesRepository.findOne({ email: data.email });
    if (exists) {
      throw new ConflictException('Cliente já cadastrado');
    }
    const cliente = this.em.create(Cliente, {
      ...data,
    });
    await this.em.flush();
    return cliente;
  }

  async findAll(): Promise<Cliente[]> {
    return this.clientesRepository.findAll();
  }

  async findOne(id: number): Promise<Cliente> {
    return this.clientesRepository.findOneOrFail(id);
  }

  async update(id: number, data: UpdateClienteDto): Promise<Cliente> {
    const cliente = await this.clientesRepository.findOneOrFail(id);
    const emailExists = await this.clientesRepository.findOne({
      email: data.email,
      id: { $ne: id },
    });
    if (emailExists) {
      throw new ConflictException('Este email já está sendo utilizado');
    }
    wrap(cliente).assign(data, { ignoreUndefined: true });
    await this.em.flush();
    return cliente;
  }

  async remove(id: number): Promise<void> {
    const cliente = await this.clientesRepository.findOneOrFail(id);
    await this.em.removeAndFlush(cliente);
  }
}
