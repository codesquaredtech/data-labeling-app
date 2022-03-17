import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/model/user.model';
import { UserService } from 'src/user/user.service';
import { MetadataService } from './metadata.service';
import { MetadataSchema } from './models/metamodel.model';
import { ProjectSchema } from './models/project.model';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [
      MongooseModule.forFeature(
      [
        {name:'project',schema:ProjectSchema},
        {name:'metadata',schema:MetadataSchema},
        {name:'user',schema:UserSchema}
      ])
    ],
  controllers: [ProjectController],
  providers: [ProjectService, UserService, MetadataService]
})
export class ProjectModule {}
