import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';
import { RedisService } from './redis.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly redisService: RedisService,
  ) {}

  async verify(pseudonyme: string, pass: string): Promise<any> {
    const user = await this.userService.getByPseudonym(pseudonyme);
    const isValidPassword = await bcrypt.compare(pass, user?.password);

    if (isValidPassword) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: User) {
    const payload = {
      pseudonym: user.pseudonym,
      sub: user.pseudonym,
      role: user.role,
    };
    return {
      access_token: await this.redisService.sign(payload),
    };
  }

  async logout(token: string) {
    return this.redisService.revoke(token);
  }
}
