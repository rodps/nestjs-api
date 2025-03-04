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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UserRole } from 'src/common/enums/roles.enum';
import { Auth } from 'src/common/decorators/auth.decorator';

@Controller()
@Auth(UserRole.ADMIN)
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  async createProduct(@Body() data: CreateProductDto) {
    return await this.productService.createProduct(data);
  }

  @Get()
  async getProducts() {
    return await this.productService.getProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    return await this.productService.getProductById(id);
  }

  @Put(':id')
  async updateProduct(@Param('id') id: number, @Body() data: UpdateProductDto) {
    return await this.productService.updateProduct(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProduct(@Param('id') id: number): Promise<void> {
    return this.productService.deleteProduct(id);
  }
}
