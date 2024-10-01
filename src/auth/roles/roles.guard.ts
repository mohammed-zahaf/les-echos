import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RedisService } from '../redis.service';
import { Roles } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private redisService: RedisService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { headers } = request;
    const { authorization } = headers;
    const roles = this.reflector.get(Roles, context.getHandler());
    const token = (authorization || '')?.split(' ')?.[1];
    const payload = (await this.redisService.verify(
      token.replace(/[<>]/g, ''),
    )) as {
      role: string;
    };

    if (!roles) {
      return true;
    }

    return roles.includes(payload.role);
  }
}
