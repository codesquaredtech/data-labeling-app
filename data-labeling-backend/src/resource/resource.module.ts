import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectService } from 'src/project/project.service';
import { UserService } from 'src/user/user.service';
import { MetadataService } from './../project/metadata.service';
import { ResourceSchema } from './model/resource.model';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'resource', schema: ResourceSchema }],
      'resourcesDb',
    ),
  ],
  controllers: [ResourceController],
  providers: [ResourceService, ProjectService, MetadataService, UserService],
  exports: [ResourceService],
})
export class ResourceModule {}
