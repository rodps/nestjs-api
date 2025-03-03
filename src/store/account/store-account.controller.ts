import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { StoreAccountService } from './store-account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { StoreAuthGuard } from '../auth/store-auth.guard';
import { Public } from 'src/common/decorators/public.decorator';

@Controller()
@UseGuards(StoreAuthGuard)
export class StoreAccountController {
  constructor(private readonly accountService: StoreAccountService) {}

  @Public()
  @Post()
  async create(@Body() data: CreateAccountDto) {
    return await this.accountService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: CreateAccountDto) {
    return await this.accountService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.accountService.remove(id);
  }
}
