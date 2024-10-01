import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { Error } from 'mongoose';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':pseudonym')
  findOne(@Param('pseudonym') pseudonym: string) {
    return this.userService.getByPseudonym(pseudonym);
  }

  /**
   * Creates a new user.
   *
   * @param {CreateUserDto} createUserDto - The DTO containing user creation details.
   * @returns {Promise<User>} - A promise that resolves with the created user.
   * @throws {Error} - Throws an error if a user with the provided pseudonym already exists.
   */
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const isPseudonymExist = await this.userService.doesUserExist(
      createUserDto.pseudonym,
    );
    if (isPseudonymExist) {
      throw new Error('User with this pseudonym already exists');
    }

    return this.userService.create(createUserDto);
  }

  /**
   * Updates the current user's information based on the provided data.
   *
   * @param {Request} req - The HTTP request object containing the authorization header.
   * @param {any} updateUserDto - The data transfer object containing user information to update.
   * @return {Promise<any>} A promise that resolves to the updated user information.
   */
  @Put('me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'user'])
  async updateMe(
    @Req() req: Request,
    @Body() updateUserDto: any,
  ): Promise<any> {
    const authorization = req.headers['authorization'];
    const token = (authorization || '')?.split(' ')?.[1];
    const secret = this.configService.get('JWT_SECRET');
    const payload = jwt.verify(token.replace(/[<>]/g, ''), secret) as {
      pseudonym: string;
    };

    return this.userService.updateByPseudonym(payload.pseudonym, updateUserDto);
  }

  /**
   * Updates a user's details based on their pseudonym.
   *
   * @param {string} pseudonym - The pseudonym of the user to be updated.
   * @param {object} updateUserDto - The data transfer object containing updated user details.
   * @return {Promise<object>} The updated user object.
   */
  @Put(':pseudonym')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  async updateUser(
    @Param('pseudonym') pseudonym: string,
    @Body() updateUserDto: any,
  ): Promise<object> {
    return this.userService.updateByPseudonym(pseudonym, updateUserDto);
  }

  @Delete(':pseudonym')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  async removeUser(@Param('pseudonym') pseudonym: string) {
    return await this.userService.deleteUser(pseudonym);
  }
}
