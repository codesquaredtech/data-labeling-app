import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/auth/firebase.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ProjectService } from 'src/project/project.service';
import { userFirebasePost } from './dto/UserFirebasePost.dto';
import { UserInfo } from './model/DTO/user.dto';
import { Role, User } from './model/user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly projectService: ProjectService,
  ) {}

  //http://1b7a-82-117-211-166.ngrok.io/user/auth-trigger
  @Post('auth-trigger')
  async authTrigger(@Body() userFirebasePost: userFirebasePost) {
    const userDTO = await this.userService.findUserByUid(userFirebasePost.uuid);
    if (userDTO == null) {
      const user = new User();
      user.email = userFirebasePost.email;
      user.uuid = userFirebasePost.uuid;
      user.roles = [];
      user.roles.push(Role.User);
      await this.userService.createUser(user);
    } else {
      console.log('Hello ' + userFirebasePost.email);
    }
  }

  @Get('/my-info')
  @UseGuards(FirebaseAuthGuard)
  async getMyInfo(@Req() req) {
    const user = await this.userService.findUserByUid(req.user.user_id);
    const userDto = new UserInfo();
    userDto.displayName = `${user.firstname} ${user.lastname}`;
    userDto.email = user.email;
    userDto.isAdmin = user.roles.includes(Role.Admin);

    return userDto;
  }

  @Get('projects')
  @UseGuards(FirebaseAuthGuard)
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  async getUsersProject(@Req() req) {
    const user = await this.userService.findUserByUid(req.user.uid);
    return this.projectService.getProjectByUsers(user._id);
  }

  @Get('all')
  async getAllUsers() {
    const users = await this.userService.readUsers();
    const result = users.filter((f) => !f.roles.includes(Role.Admin));
    return result;
  }
}
