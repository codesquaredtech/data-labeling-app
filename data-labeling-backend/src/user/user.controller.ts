import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserCreateDTO } from './model/DTO/user.dto';
import { User } from './model/user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {


    constructor(private readonly userService: UserService){}




    @Post()
    createUser(@Body() userDTO: UserCreateDTO):Promise<UserCreateDTO>{

        return this.userService.createUser(userDTO);

    }

    @Get("all")
    getAllUsers(){
        return this.userService.readUsers();
    }

}
