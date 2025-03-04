import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserRole } from '../enums/roles.enum';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Roles } from './roles.decorator';

export function Auth(...roles: UserRole[]) {
  return applyDecorators(UseGuards(JwtAuthGuard), Roles(roles));
}
