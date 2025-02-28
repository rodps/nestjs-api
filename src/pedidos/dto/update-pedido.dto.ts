import { IsEnum, IsOptional } from 'class-validator';
import { PedidoStatus } from '../entities/pedido.entity';

export class UpdatePedidoDto {
  @IsOptional()
  endereco: string;

  @IsOptional()
  @IsEnum(PedidoStatus, {
    message: 'Status inválido',
  })
  status: number;

  @IsOptional()
  dataPedido: Date;

  @IsOptional()
  dataEntrega: Date;
}
