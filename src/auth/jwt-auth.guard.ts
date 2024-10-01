/*
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
*/

import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RedisService } from './redis.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private redisService: RedisService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const [bearer, token]: [string, string] =
      request.headers.authorization?.split(' ');

    if (!bearer.includes('Bearer') || !token) {
      throw new UnauthorizedException("token can't be processed");
    }

    try {
      await this.redisService.verify(token.replace(/[<>]/g, ''));
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
