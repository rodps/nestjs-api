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
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { ProdutoDto } from './dto/produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  async createProduto(@Body() data: CreateProdutoDto): Promise<ProdutoDto> {
    const produto = data.toEntity();
    await this.produtoService.createProduto(produto);
    return ProdutoDto.fromEntity(produto);
  }

  @Get()
  async getProdutos(): Promise<ProdutoDto[]> {
    return (await this.produtoService.getProdutos()).map((produto) =>
      ProdutoDto.fromEntity(produto),
    );
  }

  @Get(':id')
  async getProdutoById(@Param('id') id: number): Promise<ProdutoDto> {
    return await this.produtoService
      .getProdutoById(id)
      .then((produto) => ProdutoDto.fromEntity(produto));
  }

  @Put(':id')
  async updateProduto(
    @Param('id') id: number,
    @Body() data: UpdateProdutoDto,
  ): Promise<ProdutoDto> {
    const produto = data.toEntity();
    await this.produtoService.updateProduto(id, produto);
    return ProdutoDto.fromEntity(produto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProduto(@Param('id') id: number): Promise<void> {
    return this.produtoService.deleteProduto(id);
  }
}
