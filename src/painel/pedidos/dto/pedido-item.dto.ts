import { IsNotEmpty } from 'class-validator';

export class PedidoItemDto {
  @IsNotEmpty()
  produtoId: number;

  @IsNotEmpty()
  quantidade: number;
}
