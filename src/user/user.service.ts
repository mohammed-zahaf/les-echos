import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * Checks if a user with the given pseudonym exists in the database.
   *
   * @param {string} pseudonym - The pseudonym of the user to check for existence.
   * @return {Promise<boolean>} - A promise that resolves to true if the user exists, otherwise false.
   */
  async doesUserExist(pseudonym: string): Promise<boolean> {
    const user = await this.userModel.findOne({ pseudonym }).exec();

    return !!user;
  }

  /**
   * Retrieves a user by their pseudonym from the database.
   *
   * @param {string} pseudonym - The pseudonym of the user to be retrieved.
   * @return {Promise<User>} A promise that resolves to the user object if found.
   * @throws {NotFoundException} If no user with the given pseudonym is found.
   */
  async getByPseudonym(pseudonym: string): Promise<User> {
    const user = await this.userModel.findOne({ pseudonym }).lean().exec();
    if (!user) {
      throw new NotFoundException(`User with pseudonym ${pseudonym} not found`);
    }

    return user;
  }

  /**
   * Creates a new user using the provided data transfer object.
   *
   * @param {CreateUserDto} createUserDto - The data transfer object containing the user information to create.
   * @return {Promise<User>} - A promise that resolves to the created user document.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  /**
   * Updates a user identified by pseudonym with new data.
   *
   * @param {string} pseudonym - The pseudonym of the user to update.
   * @param {UpdateUserDto} updateUserDto - The data to update the user with.
   * @return {Promise<User>} The updated user.
   * @throws {NotFoundException} If no user with the given pseudonym is found.
   */
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

  /**
   * Deletes a user from the database based on their pseudonym.
   *
   * @param {string} pseudonym - The pseudonym of the user to be deleted.
   * @return {Promise<{message: string}>} A promise resolving to an object containing a confirmation message.
   * @throws Will throw an error if the user does not exist.
   */
  async deleteUser(pseudonym: string): Promise<{ message: string }> {
    const isUserExist = await this.doesUserExist(pseudonym);
    if (!isUserExist) {
      throw new Error("This operation can't be processed!");
    }

    await this.userModel.deleteOne({ pseudonym }).exec();
    return { message: 'User has been removed:' };
  }
}
