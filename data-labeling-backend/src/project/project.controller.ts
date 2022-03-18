import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { response } from 'express';
import { User } from 'src/user/model/user.model';
import { UserService } from 'src/user/user.service';
import { MetadataDTO } from './DTO/Metadata.dto';
import { ProjectTemplateDTO } from './DTO/ProjectTemplate.dto';
import { RemoveMetadataDTO } from './DTO/removeMetadata.dto';
import { MetadataService } from './metadata.service';
import { Metadata, MetadataDocument } from './models/metamodel.model';
import { Project } from './models/project.model';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {



    constructor(private readonly projectService: ProjectService,
      private readonly userService: UserService,
      private readonly metadataService: MetadataService
      ){}


    @Get("/all")
    async getAllProjects(){
      return this.projectService.getAllProjects();
    }

    @Get(":id")
    async getProjectById(@Param("id") id: string){
      return await this.projectService.findProject(id);
    }





    @Post()
    async createProjectTemplate(@Body() projectTemplate: ProjectTemplateDTO){
        let project = new Project();
        project.title = projectTemplate.title;
        project.description = projectTemplate.description;
        project.inputFile = projectTemplate.inputFile;
        project.identNumber = projectTemplate.identNumber;
        project.users = [];

        for (const userId of projectTemplate.users) {
          let user = await this.userService.findUser(userId);
          console.log(user);
          project.users.push(user);
          
        }

        this.projectService.createProject(project);

    }

    @Post(":id/metadata")
    async createMetadataForProject(@Param("id") idProjekta: string, @Body() metadata: Metadata){
        let project = await this.projectService.findProject(idProjekta);
        let saved = await this.metadataService.createMetadata(metadata);
        project.metadata.push(saved);
        const updated = await this.projectService.updateProject(idProjekta,project);
        return updated;


    }


    @Get(":id/metadata")
    async getAllMetadatasByProject(@Param("id") idProject: string){
      let project = await this.projectService.findProject(idProject);
      let listMetadatas = [];
      for (const metadata of project.metadata) {
        listMetadatas.push(await this.metadataService.findById(metadata._id.toString()))
        
      }
   
      return listMetadatas;
    }

    @Get(":id/users")
    async getUsersByProject(@Param("id") id:string){
      let project = await this.projectService.findProject(id);
      let listUsers = [];
      for(const user of project.users){
        listUsers.push(await this.userService.findUser(user._id.toString()));
      }

      return listUsers;


    }

    @Post("remove-metadata")
    async removeMetadata(@Body() dto:RemoveMetadataDTO){
      let project = await this.projectService.findProject(dto.projectId);
      project.metadata  = project.metadata.filter(meta => meta._id.toString() !== dto.metadataId);
      console.log(project.metadata);
      const updated = await this.projectService.updateProject(project.identNumber,project);
      return updated;


    }



    }







