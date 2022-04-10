import { Body, Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import { Auth } from 'firebase-admin/lib/auth/auth';
import { FirebaseAuthGuard } from 'src/auth/firebase.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ProjectService } from 'src/project/project.service';
import { userFirebasePost } from './dto/UserFirebasePost.dto';
import { UserCreateDTO, UserInfo } from './model/DTO/user.dto';
import { Role, User } from './model/user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {


    constructor(private readonly userService: UserService, private readonly projectService: ProjectService){}





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

    @Get("/my-info")
    @UseGuards(FirebaseAuthGuard)
    async getMyInfo(@Req() req){
        let user = await this.userService.findUserByUid(req.user.user_id);
        let userDto = new UserInfo();
        userDto.email = user.email;
        if(user.roles.includes(Role.Admin)){
            userDto.isAdmin = true;
        }else{
            userDto.isAdmin = false;
        }

        return userDto;


    }


    @Get("projects")
    @UseGuards(FirebaseAuthGuard)
    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    async getUsersProject(@Req() req) {
      let user = await this.userService.findUserByUid(req.user.user_id);
      const projects = await this.projectService.findByUser(user._id);
      return this.projectService.getProjectByUsers(projects);
    }

    @Get("all")
    async getAllUsers(){
        let users = await this.userService.readUsers();
        let result = users.filter(f => !f.roles.includes(Role.Admin));
        return result;

    }


}
