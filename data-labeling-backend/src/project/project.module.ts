import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MetadataSchema } from './models/metamodel.model';
import { ProjectSchema } from './models/project.model';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name:'project',schema:ProjectSchema},{name:'metadata',schema:MetadataSchema} ])
  ],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule {}
