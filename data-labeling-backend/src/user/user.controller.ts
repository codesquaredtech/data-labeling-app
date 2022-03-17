import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
    @Post()
    createUser2(@Body() userDTO: User):Promise<User>{

        return this.userService.createUser(userDTO);

    }



    @Get("all")
    getAllUsers(){
        return this.userService.readUsers();
    }

    @Get(":id")
    getOneUser(@Param("id") id: string){
        console.log(id);
        console.log(this.userService.findUser(id));
        return this.userService.findUser(id);

    }

}
