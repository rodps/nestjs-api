import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { JwtPayload } from 'src/common/types/jwt-payload';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Roles } from '../decorators/roles.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.isPublicRoute(context)) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    const payload = await this.extractPayloadFromToken(token);
    const roles = this.getRoles(context);

    if (!this.validateRole(payload, roles)) {
      throw new UnauthorizedException();
    }

    request['user'] = {
      id: payload.sub,
      username: payload.username,
      role: payload.role,
    };
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private isPublicRoute(context: ExecutionContext): boolean {
    return this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  private getRoles(context: ExecutionContext): string[] {
    return this.reflector.getAllAndOverride<string[]>(Roles, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  private validateRole(payload: JwtPayload, roles: string[]): boolean {
    return roles !== undefined && roles.includes(payload.role);
  }

  private async extractPayloadFromToken(token: string): Promise<JwtPayload> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch {
      throw new UnauthorizedException();
    }
  }
}
