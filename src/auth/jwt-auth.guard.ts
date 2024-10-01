import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RedisService } from './redis.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly redisService: RedisService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { headers } = context.switchToHttp().getRequest();
    const { authorization } = headers;
    const [bearer, token]: [string, string] = (authorization || '')?.split(' ');

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
