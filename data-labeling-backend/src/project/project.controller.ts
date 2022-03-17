import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { response } from 'express';
import { User } from 'src/user/model/user.model';
import { UserService } from 'src/user/user.service';
import { MetadataDTO } from './DTO/Metadata.dto';
import { ProjectTemplateDTO } from './DTO/ProjectTemplate.dto';
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


    @Get(":id")
    getMetadataByProject(@Param("id") id: string){


      //  let lista = []
        //let projects = projectService.findAll();
        //for(Project project: projects){
      //      for(Metadata metadata: project.metadatas){
        //   if(id === Metadata.id){
        //       //lista.push(metadata)
        //   }
      }
     //   }
      //  
//
    }







