import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { Metadata, MetadataDocument } from './models/metamodel.model';
import { Project, ProjectDocument } from './models/project.model';

@Injectable()
export class ProjectService {

    constructor(
        @InjectModel("project") private readonly projectModel: Model<ProjectDocument>
    ){}


    async createProject(project: Project):Promise<Project>{
        const newProject = new this.projectModel(project);
        return newProject.save();

    }






}
