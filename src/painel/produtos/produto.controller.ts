import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller()
@UseGuards(AuthGuard)
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  async createProduto(@Body() data: CreateProdutoDto) {
    return await this.produtoService.createProduto(data);
  }

  @Get()
  async getProdutos() {
    return await this.produtoService.getProdutos();
  }

  @Get(':id')
  async getProdutoById(@Param('id') id: number) {
    return await this.produtoService.getProdutoById(id);
  }

  @Put(':id')
  async updateProduto(@Param('id') id: number, @Body() data: UpdateProdutoDto) {
    return await this.produtoService.updateProduto(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProduto(@Param('id') id: number): Promise<void> {
    return this.produtoService.deleteProduto(id);
  }
}
