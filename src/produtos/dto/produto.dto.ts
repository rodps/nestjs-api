import { Produto } from '../produto.entity';

export class ProdutoDto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;

  static fromEntity(produto: Produto): ProdutoDto {
    const dto = new ProdutoDto();
    dto.id = produto.id;
    dto.nome = produto.nome;
    dto.preco = produto.preco;
    dto.estoque = produto.estoque;
    return dto;
  }
}
