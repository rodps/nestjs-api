import { Body, Controller, Post } from '@nestjs/common';
import { StoreAuthService } from './store-auth.service';
import { LoginDto } from './dto/login.dto';

@Controller()
export class StoreAuthController {
  constructor(private readonly authService: StoreAuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;
    return await this.authService.login(email, password);
  }
}
