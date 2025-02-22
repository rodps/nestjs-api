import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Produto } from './produto.entity';
import { ProdutoService } from './produto.service';

@Module({
  imports: [MikroOrmModule.forFeature([Produto])],
  controllers: [ProdutoController],
  providers: [ProdutoService],
})
export class ProdutosModule {}
