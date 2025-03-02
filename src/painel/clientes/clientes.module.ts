import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Cliente } from './cliente.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Cliente])],
  providers: [ClientesService],
  controllers: [ClientesController],
})
export class ClientesModule {}
