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

    async findByUser(id):Promise<Project[]>{

        const ObjectId =require('mongodb').ObjectId;
        const projectList = <Project[]> await this.projectModel.find({
            "users":ObjectId(id)
        }).lean().exec();

        return projectList;
    }


    async updateProject(id, data):Promise<Project>{
        return await this.projectModel.findOneAndUpdate({identNumber:id}, data, {new:true})
    }






}
