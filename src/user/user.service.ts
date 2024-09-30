import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async doesUserExist(pseudonym: string): Promise<boolean> {
    const user = await this.userModel.findOne({ pseudonym }).exec();

    return !!user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async getByPseudonym(pseudonym: string): Promise<User> {
    const user = await this.userModel.findOne({ pseudonym }).lean().exec();
    if (!user) {
      throw new NotFoundException(`User with pseudonym ${pseudonym} not found`);
    }

    return user;
  }

  async updateByPseudonym(
    pseudonym: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const updatedUser = await this.userModel
      .findOneAndUpdate(
        { pseudonym },
        { $set: updateUserDto },
        { new: true, runValidators: true },
      )
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`User with pseudonym ${pseudonym} not found`);
    }

    return updatedUser;
  }
}
