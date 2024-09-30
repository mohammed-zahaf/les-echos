import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { JwtPayload } from 'jsonwebtoken';
// import { JwtPayload, sign, verify } from 'jsonwebtoken-esm';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RedisService {
  private redisClient: Redis;

  constructor(private configService: ConfigService) {
    this.redisClient = new Redis({
      host: this.configService.get<string>('REDIS_HOST'),
      port: this.configService.get<number>('REDIS_PORT'),
    });
  }

  public async sign(payload: object): Promise<string> {
    const expiresIn = this.configService.get<string>('JWT_TOKEN_DELAY');
    const secret = this.configService.get<string>('JWT_SECRET');

    return jwt.sign(payload, secret, { expiresIn });
  }

  public async validateToken(token: string): Promise<JwtPayload | string> {
    const secret = this.configService.get<string>('JWT_SECRET');

    try {
      return jwt.verify(token, secret);
    } catch (error) {
      throw new Error(`Invalid token! ${error.message}`);
    }
  }

  public async revokeToken(token: string) {
    await this.redisClient.del(token);
    return { message: 'Token has been revoked!' };
  }
}
