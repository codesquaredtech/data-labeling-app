import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { MetadataSchema } from './models/metamodel.model';
import { ProjectSchema } from './models/project.model';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name:'project',schema:ProjectSchema},{name:'metadata',schema:MetadataSchema} ]),
    forwardRef(()=> UserModule)
  ],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule {}
