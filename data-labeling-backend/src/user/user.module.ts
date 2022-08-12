import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './model/user.model';
import { ProjectService } from 'src/project/project.service';
import { ProjectSchema } from 'src/project/models/project.model';
import { ResourceSchema } from 'src/project/models/resource.model';
import { ResourceService } from 'src/project/resource.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'user', schema: UserSchema },
      { name: 'project', schema: ProjectSchema },
      { name: 'resource', schema: ResourceSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, ProjectService, ResourceService],
  exports: [UserService, ResourceService],
})
export class UserModule {}
