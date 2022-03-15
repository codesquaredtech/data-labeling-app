import { Body, Controller, Get, Post } from '@nestjs/common';
import { Metadata } from './models/metamodel.model';
import { Project } from './models/project.model';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {



    constructor(private readonly projectService: ProjectService){}



    @Post()
    createMetamodel(@Body() project:Project){
        console.log(project);
        return this.projectService.createProject(project);

        

    }






}
