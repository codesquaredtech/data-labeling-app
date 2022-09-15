import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Role } from 'src/user/model/user.model';
import { UserService } from 'src/user/user.service';
import { ProjectTemplateDTO } from './DTO/ProjectTemplate.dto';
import { Metadata } from './models/metamodel.model';
import { ProjectService } from './project.service';
import { FirebaseAuthGuard } from 'src/auth/firebase.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('projects')
@UseGuards(FirebaseAuthGuard)
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
  ) {}

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Get('/')
  async getAllProjects() {
    return this.projectService.getAllProjects();
  }

  @Roles(Role.Admin)
  @Get(':id')
  async getProjectById(@Req() req, @Param('id') id: string) {
    return await this.projectService.findProject(id);
  }

  @Roles(Role.Admin)
  @Post()
  async createProjectTemplate(@Body() projectTemplate: ProjectTemplateDTO) {
    this.projectService.createProjectFromTemplate(projectTemplate);
  }

  @Roles(Role.Admin)
  @Post(':id/metadata')
  async createMetadataForProject(
    @Param('id') projectId: string,
    @Body() metadata: Metadata,
  ) {
    return this.projectService.createMetadata(projectId, metadata);
  }

  @Roles(Role.Admin)
  @Put(':id')
  async updateProject(
    @Param('id') projectId: string,
    @Body() projectDTO: Pick<ProjectTemplateDTO, 'title' | 'description'>,
  ) {
    const project = await this.projectService.findProject(projectId);

    const modifiedProject = {
      ...project,
      ...projectDTO,
    };

    return this.projectService.updateProject(projectId, modifiedProject);
  }

  @Roles(Role.Admin)
  @Put(':projectId/metadata/:id')
  async updateMetadata(
    @Param('projectId') projectId: string,
    @Param('id') metadataId: string,
    @Body() metadataDTO: { name: string; type: string },
  ) {
    return this.projectService.updateMetadata(
      projectId,
      metadataId,
      metadataDTO,
    );
  }

  @Roles(Role.Admin)
  @Post(':id/users')
  async addUsersToProject(
    @Param('id') projectId: string,
    @Body() users: string[],
  ) {
    const project = await this.projectService.findProject(projectId);
    const userObjectsArr = [];

    for (const userId of users) {
      const userObj = await this.userService.findUser(userId);
      userObjectsArr.push(userObj);
    }
    project.users = [...project.users, ...userObjectsArr];
    const updated = await this.projectService.updateProject(projectId, project);
    return updated;
  }
  //
  // @Roles(Role.Admin)
  // @Get(':id/metadata')
  // async getAllMetadatasByProject(@Param('id') idProject: string) {
  //   const project = await this.projectService.findProject(idProject);
  //   return this.metadataService.getMetadataByProject(project);
  // }

  @Roles(Role.Admin)
  @Get(':id/users')
  async getUsersByProject(@Param('id') id: string) {
    const project = await this.projectService.findProject(id);
    const listUsers = [];
    for (const user of project.users) {
      listUsers.push(await this.userService.findUser(user._id.toString()));
    }
    return listUsers;
  }

  @Roles(Role.Admin)
  @Delete(':projectId/metadata/:id')
  async removeMetadata(
    @Param('projectId') projectId: string,
    @Param('id') metadataId: string,
  ) {
    return this.projectService.deleteMetadata(projectId, metadataId);
  }

  @Roles(Role.Admin)
  @Delete(':projectId/users/:id')
  async removeUser(
    @Param('projectId') projectId: string,
    @Param('id') userId: string,
  ) {
    const project = await this.projectService.findProject(projectId);
    project.users = project.users.filter(
      (user) => user._id.toString() !== userId,
    );
    const updated = await this.projectService.updateProject(
      project.identNumber,
      project,
    );

    return updated;
  }
}
