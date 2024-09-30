import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Error } from 'mongoose';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':pseudonym')
  async findByPseudonym(@Param('pseudonym') pseudonym: string) {
    return this.userService.getByPseudonym(pseudonym);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const isPseudonymExist = await this.userService.doesUserExist(
      createUserDto.pseudonym,
    );
    if (!isPseudonymExist) {
      throw new Error('User with this pseudonym already exists');
    }

    return this.userService.create(createUserDto);
  }

  @Put(':pseudonym')
  async updateByPseudonym(
    @Param('pseudonym') pseudonym: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateByPseudonym(pseudonym, updateUserDto);
  }
}
