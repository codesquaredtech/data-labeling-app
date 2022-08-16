import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './model/user.model';
import { ProjectService } from 'src/project/project.service';
import { ProjectSchema } from 'src/project/models/project.model';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: 'user', schema: UserSchema },
        { name: 'project', schema: ProjectSchema },
      ],
      'testDb',
    ),
  ],
  controllers: [UserController],
  providers: [UserService, ProjectService],
  exports: [UserService],
})
export class UserModule {}
