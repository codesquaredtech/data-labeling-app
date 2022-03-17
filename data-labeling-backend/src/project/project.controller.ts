import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from 'src/user/model/user.model';
import { UserService } from 'src/user/user.service';
import { MetadataDTO } from './DTO/Metadata.dto';
import { ProjectTemplateDTO } from './DTO/ProjectTemplate.dto';
import { Metadata } from './models/metamodel.model';
import { Project } from './models/project.model';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {



    constructor(private readonly projectService: ProjectService,
      private readonly userService: UserService){}



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

    @Post(":id")
    createMetadataForProject(@Param("id") idProjekta: string, @Body() metadataDTO: MetadataDTO){


        //let project = findProjectById(id);

        let metadata = new MetadataDTO();
        metadata.name = metadata.name;

        //project.metadatas.push(metadata);

        //update project

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







