import { IsOptional } from 'class-validator';

export class UpdatePedidoDto {
  @IsOptional()
  endereco: string;

  @IsOptional()
  dataPedido: Date;

  @IsOptional()
  dataEntrega: Date;
}
