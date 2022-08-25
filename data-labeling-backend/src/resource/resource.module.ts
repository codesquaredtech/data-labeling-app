import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectService } from 'src/project/project.service';
import { UserService } from 'src/user/user.service';
import { MetadataService } from './../project/metadata.service';
import { ResourceSchema } from './model/resource.model';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';
import { UserSchema } from 'src/user/model/user.model';
import { MetadataSchema } from './../project/models/metamodel.model';
import { ProjectSchema } from 'src/project/models/project.model';
import { GlobalService } from '../global/global.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'resource', schema: ResourceSchema },
      { name: 'project', schema: ProjectSchema },
      { name: 'metadata', schema: MetadataSchema },
      { name: 'user', schema: UserSchema },
    ]),
  ],
  controllers: [ResourceController],
  providers: [
    ResourceService,
    ProjectService,
    MetadataService,
    UserService,
    GlobalService,
  ],
  exports: [ResourceService],
})
export class ResourceModule {}
