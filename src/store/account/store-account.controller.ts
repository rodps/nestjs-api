import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { StoreAccountService } from './store-account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { UserRole } from 'src/common/enums/roles.enum';
import { Auth } from 'src/common/decorators/auth.decorator';

@Controller()
@Auth(UserRole.STORE)
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
