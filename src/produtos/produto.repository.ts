import { EntityRepository } from '@mikro-orm/postgresql';
import { Produto } from './produto.entity';
import { UnprocessableEntityException } from '@nestjs/common';

export class ProdutoRepository extends EntityRepository<Produto> {
  async findOneOrUnprocessable(id: number): Promise<Produto> {
    const produto = await this.findOne(id);
    if (!produto) {
      throw new UnprocessableEntityException(`Produto ${id} nao encontrado`);
    }
    return produto;
  }
}
