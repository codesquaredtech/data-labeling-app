import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role, UserDocument } from './model/user.model';
import {Model} from 'mongoose';
import { User } from './model/user.model';
import { UserCreateDTO } from './model/DTO/user.dto';

@Injectable()
export class UserService {


    constructor(
        @InjectModel("user") private readonly userModel: Model<UserDocument>
    ){}


    async createUser(user: UserCreateDTO):Promise<User>{

        const newUser = new this.userModel(user);
        return newUser.save();

    }


    async readUsers(){
        return this.userModel.find({})
        .then((user) => {return user})
        .catch((err) => console.log(err));
    }
}
