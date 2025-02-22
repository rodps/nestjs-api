import { Injectable } from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';
import { Produto } from './produto.entity';
import { EntityManager, wrap } from '@mikro-orm/postgresql';

@Injectable()
export class ProdutoService {
  constructor(
    private readonly produtoRepository: ProdutoRepository,
    private readonly em: EntityManager,
  ) {}

  async createProduto(data: Produto): Promise<Produto> {
    await this.em.persistAndFlush(data);
    return data;
  }

  async getProdutos(): Promise<Produto[]> {
    return this.produtoRepository.findAll();
  }

  async getProdutoById(id: number): Promise<Produto> {
    return this.produtoRepository.findOneOrFail(id);
  }

  async updateProduto(id: number, data: Produto): Promise<void> {
    const produto = await this.produtoRepository.findOneOrFail(id);
    wrap(produto).assign(data, { ignoreUndefined: true });
    await this.em.flush();
  }

  async deleteProduto(id: number): Promise<void> {
    const produto = await this.produtoRepository.findOneOrFail(id);
    await this.em.removeAndFlush(produto);
  }
}
