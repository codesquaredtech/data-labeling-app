import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './model/user.model';
import { Model } from 'mongoose';
import { User } from './model/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async readUsers() {
    const users = <User[]>await this.userModel.find({}).lean().exec();
    return users;
  }

  async findUserByUid(id: string) {
    const user = <User>await this.userModel.findOne({ uuid: id }).lean().exec();
    return user;
  }

  async findUserByUid2(id: string) {
    const user = this.userModel.findOne({ uuid: id }).lean().exec();
    return user;
  }

  async findUser(id: string) {
    const user = <User>await this.userModel.findOne({ _id: id }).lean().exec();
    if (!user) {
      throw new NotFoundException('Could not find user!');
    }
    return user;
  }
}
