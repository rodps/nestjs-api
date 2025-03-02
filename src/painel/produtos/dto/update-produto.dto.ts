import { IsNotEmpty } from 'class-validator';

export class UpdateProdutoDto {
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  nome: string;

  @IsNotEmpty({ message: 'O campo preco é obrigatório' })
  preco: number;

  @IsNotEmpty({ message: 'O campo estoque é obrigatório' })
  estoque: number;
}
