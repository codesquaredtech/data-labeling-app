import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { response } from 'express';
import { User } from 'src/user/model/user.model';
import { UserService } from 'src/user/user.service';
import { DataAccepting } from './DTO/DataAccepting.dto';
import { ProjectMetadataDTO } from './DTO/ProjectMetadata.dto';
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


    @Post("remove-user")
    async removeUser(@Body() dto:RemoveMetadataDTO){
      let project = await this.projectService.findProject(dto.projectId);
      project.users = project.users.filter(user => user._id.toString() !== dto.metadataId);
      const updated = await this.projectService.updateProject(project.identNumber,project);
      return updated;
    }

    @Get("user-project/:id")
    async getUsersProject(@Param("id") id: string){
      return await this.projectService.findByUser(id);
    }


    @Get("label-project/:id")
    async projectByUser(@Param("id") id: string){
      //Ovde će da se namapira na korisnika, sve projekti na kojim je korisnik

      let project = await this.projectService.findProject(id);
      let metadataProjectDto = new ProjectMetadataDTO();
      metadataProjectDto.fields = [];

      for (const m of project.metadata) {
        let metadata = await this.metadataService.findById(m._id.toString());
        metadataProjectDto.fields.push(metadata);

        
      }

      metadataProjectDto.projectId = project.identNumber;
      metadataProjectDto.projectResource = project.inputFile;
      metadataProjectDto.projectTitle = project.title;

      return metadataProjectDto;



    
    }

    @Post("labeling-accept/:id")
    async dataAccepting(@Body() body: DataAccepting[],@Param("id") idProjekta: string){
      let project = await this.projectService.findProject(idProjekta);
      project.outputFile = [];
      for(const b of body){
        project.outputFile.push(b);

      }
      console.log(project.outputFile);
      const updated = await this.projectService.updateProject(project.identNumber,project);


    }



    }







