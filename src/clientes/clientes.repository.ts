import { EntityRepository } from '@mikro-orm/postgresql';
import { Cliente } from './cliente.entity';
import { UnprocessableEntityException } from '@nestjs/common';

export class ClientesRepository extends EntityRepository<Cliente> {
  async findOneOrUnprocessable(id: number): Promise<Cliente> {
    const cliente = await this.findOne(id);
    if (!cliente) {
      throw new UnprocessableEntityException(`Cliente ${id} nao encontrado`);
    }
    return cliente;
  }
}
