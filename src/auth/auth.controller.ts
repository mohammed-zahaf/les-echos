import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    const { pseudonym, password } = body;
    const user = await this.authService.verify(pseudonym, password);

    if (!user) {
      throw new UnauthorizedException('Invalid pseudonym or password');
    }

    return this.authService.login(user);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: Request, @Res() res: Response) {
    const token = req.headers['authorization'].split(' ')[1];

    const data = await this.authService.logout(token.replace(/[<>]/g, ''));
    res.status(HttpStatus.OK).json(data);
  }
}
