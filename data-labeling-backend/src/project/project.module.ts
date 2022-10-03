import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/model/user.model';
import { UserService } from 'src/user/user.service';
import { ProjectSchema } from './models/project.model';
import { ResourceSchema } from 'src/resource/model/resource.model';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ResourceService } from 'src/resource/resource.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'project', schema: ProjectSchema },
      { name: 'user', schema: UserSchema },
      { name: 'resource', schema: ResourceSchema },
    ]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService, UserService, ResourceService],
  exports: [ProjectService],
})
export class ProjectModule {}
