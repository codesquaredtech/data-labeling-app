import { Injectable, NotFoundException } from '@nestjs/common';
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

    async getAllProjects(){
        const projects = <Project[]> await this.projectModel.find({}).lean().exec();
        return projects;

    }

    async findProject(id){
        const project = <Project> await this.projectModel.findOne({identNumber:id}).lean().exec();
        if(!project){
            throw new NotFoundException("Could not find project!")
        }
        return project;
    }

    async findByUser(id){
        const projects = await this.getAllProjects();
        const projectList = [];
        for(const p of projects){
            for(const u of p.users){
                if(u._id.toString() === id){
                    projectList.push(p);
                }
            }
 

        }
        return projects;
    }


    async updateProject(id, data):Promise<Project>{
        return await this.projectModel.findOneAndUpdate({identNumber:id}, data, {new:true})
    }






}
