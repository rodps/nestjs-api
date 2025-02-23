import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';
import { PedidoItemDto } from './pedido-item.dto';

export class CreatePedidoDto {
  @IsNotEmpty()
  clienteId: number;

  @IsNotEmpty()
  endereco: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  itens: PedidoItemDto[];
}
