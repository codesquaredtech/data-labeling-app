import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/user/model/user.model';
import { UserService } from 'src/user/user.service';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass,
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    console.log(request.user);
    // Returns Undefined
    if (request.user == undefined) {
      console.log('Loading user...');
    } else {
      const uid = request.user.user_id;
      const user = await this.userService.findUserByUid(uid);
      return requiredRoles.some((role) => user.roles.includes(role));
    }

    return true;
  }
}
