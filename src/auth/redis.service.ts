import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private redisClient: RedisClientType;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.redisClient = createClient({
      url: this.configService.get<string>('REDIS_URI'),
    });

    this.redisClient.on('error', (err) =>
      console.error('Redis Client Error', err),
    );

    await this.redisClient.connect(); // Connexion au client Redis
  }

  async onModuleDestroy() {
    await this.redisClient.quit(); // Déconnexion lors de la destruction du module
  }

  /**
   * Generates a signed JSON Web Token (JWT) for a given payload.
   *
   * @param {Object} payload - The payload to be signed.
   * @param {string} payload.pseudonym - The pseudonym of the user.
   * @param {string} payload.sub - The subject identifier.
   * @param {string} payload.role - The role of the user.
   * @return {Promise<string>} A promise that resolves to the signed JWT.
   */
  public async sign(payload: {
    pseudonym: string;
    sub: string;
    role: string;
  }): Promise<string> {
    const expiresIn = Number(this.configService.get<string>('JWT_TOKEN_DELAY'));
    const secret = this.configService.get<string>('JWT_SECRET');
    const token = jwt.sign(payload, secret, { expiresIn });

    await this.redisClient.set(token, token);
    return token;
  }

  /**
   * Verifies the provided JWT token.
   *
   * @param {string} token - The JWT token to verify.
   * @return {Promise<jwt.JwtPayload|string>} - A promise that resolves to the JWT payload if the token is valid, or an error message if the token has been revoked or does not exist.
   */
  public async verify(token: string): Promise<jwt.JwtPayload | string> {
    const secret = this.configService.get<string>('JWT_SECRET');
    const tokenInRedis = await this.redisClient.get(token);

    if (!tokenInRedis) {
      throw new Error('Token has been revoked or does not exist!');
    }

    return jwt.verify(token, secret);
  }

  /**
   * Revokes an authentication token.
   *
   * @param {string} token - The authentication token to be revoked.
   * @return {Promise<object>} An object containing a message indicating the revocation status.
   * @throws Will throw an error if the token does not exist or has already been revoked.
   */
  public async revoke(token: string): Promise<object> {
    const number = await this.redisClient.del(token);

    if (!number) {
      throw new Error('Token has been revoked or does not exist!');
    }

    return { message: 'Token has been revoked!' };
  }

  /**
   * Revokes all entries in the Redis database by flushing it.
   *
   * @return {Promise<string>} A promise that resolves to a string indicating the result of the flush operation.
   */
  public async revokedAll(): Promise<string> {
    return this.redisClient.flushDb();
  }

  /**
   * Retrieves all tokens stored in the Redis database.
   *
   * @return {Promise<string[]>} A promise that resolves to an array of strings, each representing a token.
   */
  public async getAllTokens(): Promise<string[]> {
    return this.redisClient.keys('*');
  }
}
