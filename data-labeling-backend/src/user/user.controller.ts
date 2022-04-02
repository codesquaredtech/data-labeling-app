import { Body, Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import { Auth } from 'firebase-admin/lib/auth/auth';
import { FirebaseAuthGuard } from 'src/auth/firebase.guard';
import { userFirebasePost } from './dto/UserFirebasePost.dto';
import { UserCreateDTO } from './model/DTO/user.dto';
import { Role, User } from './model/user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {


    constructor(private readonly userService: UserService){}





    //http://1b7a-82-117-211-166.ngrok.io/user/auth-trigger
    @Post("auth-trigger")
    async authTrigger(@Body() userFirebasePost:userFirebasePost){
        let userDTO = await this.userService.findUserByUid(userFirebasePost.uuid);
        if(userDTO == null){
            let user = new User();
            user.email = userFirebasePost.email;
            user.uuid = userFirebasePost.uuid;
            user.roles = [];
            user.roles.push(Role.User);
            const save = await this.userService.createUser(user);
        }else{
            console.log("Hello " + userFirebasePost.email);
        }



    }

    @Post()
    createUser2(@Body() user: User):Promise<User>{
        return this.userService.createUser(user);
    }


    @Get("all")
    getAllUsers(){
        return this.userService.readUsers();
    }


}
