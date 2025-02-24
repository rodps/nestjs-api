import { Injectable } from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';
import { Produto } from './produto.entity';
import { EntityManager, wrap } from '@mikro-orm/postgresql';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    private readonly produtoRepository: ProdutoRepository,
    private readonly em: EntityManager,
  ) {}

  async createProduto(data: CreateProdutoDto): Promise<Produto> {
    const produto = this.em.create(Produto, data);
    await this.em.flush();
    return produto;
  }

  async getProdutos(): Promise<Produto[]> {
    return this.produtoRepository.findAll();
  }

  async getProdutoById(id: number): Promise<Produto> {
    return this.produtoRepository.findOneOrFail(id);
  }

  async updateProduto(id: number, data: UpdateProdutoDto): Promise<Produto> {
    const produto = await this.produtoRepository.findOneOrFail(id);
    wrap(produto).assign(data, { ignoreUndefined: true });
    await this.em.flush();
    return produto;
  }

  async deleteProduto(id: number): Promise<void> {
    const produto = await this.produtoRepository.findOneOrFail(id);
    await this.em.removeAndFlush(produto);
  }
}
