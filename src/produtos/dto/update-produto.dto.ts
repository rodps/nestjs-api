import { IsNotEmpty } from 'class-validator';
import { Produto } from '../produto.entity';

export class UpdateProdutoDto {
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  nome: string;

  @IsNotEmpty({ message: 'O campo preco é obrigatório' })
  preco: number;

  @IsNotEmpty({ message: 'O campo estoque é obrigatório' })
  estoque: number;

  toEntity(): Produto {
    const produto = new Produto();
    produto.nome = this.nome;
    produto.preco = this.preco;
    produto.estoque = this.estoque;
    return produto;
  }
}
