import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { User } from 'src/user/model/user.model';
import { Metadata, MetadataDocument } from './models/metamodel.model';
import { Project, ProjectDocument } from './models/project.model';
import { Resource } from './models/resource.model';
import { UserAndTheirLastResource } from './models/userLastResource.model';

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


    async createUserLastResource(ordinalNumber: number, project: Project, user: User){

        let userAndTheirLastResource = new UserAndTheirLastResource();
        userAndTheirLastResource.ordinalNumber = ordinalNumber;
        userAndTheirLastResource.userId = user._id.toString();
        project.userAndTheirLastResource.push(userAndTheirLastResource);
        const updatedProject = await this.updateProject(project.identNumber, project);
        console.log(updatedProject);
  
    }

    async findIfExist(resource: Resource, project: Project, user: User){

        for(const labeled of project.userAndTheirLastResource){
          if(labeled.ordinalNumber+1 == resource.ordinalNumber && labeled.userId == user._id.toString()){
            return labeled;
          }else{
            return null;
          }
        }
  
      }



}
