import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'), // La même clé secrète utilisée pour signer les tokens
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.pseudonyme,
      pseudonyme: payload.pseudonyme,
      role: payload.role,
    };
  }
}
