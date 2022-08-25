import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Role } from 'src/user/model/user.model';
import { UserService } from 'src/user/user.service';
import { ProjectTemplateDTO } from './DTO/ProjectTemplate.dto';
import { RemoveMetadataDTO } from './DTO/removeMetadata.dto';
import { MetadataService } from './metadata.service';
import { Metadata } from './models/metamodel.model';
import { ProjectService } from './project.service';
import { FirebaseAuthGuard } from 'src/auth/firebase.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('project')
@UseGuards(FirebaseAuthGuard)
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
    private readonly metadataService: MetadataService,
  ) {}

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Get('/all')
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
    @Param('id') idProjekta: string,
    @Body() metadata: Metadata,
  ) {
    const project = await this.projectService.findProject(idProjekta);
    const newMetadata = await this.metadataService.createMetadata(metadata);
    project.metadata.push(newMetadata);
    const updated = await this.projectService.updateProject(
      idProjekta,
      project,
    );
    return updated;
  }

  @Roles(Role.Admin)
  @Post(':id/update')
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
  @Post('metadata/:id/update')
  async updateMetadata(
    @Param('id') metadataId: string,
    @Body() metadataDTO: { name: string; type: string },
  ) {
    const metadata = await this.metadataService.findById(metadataId);

    const modifiedMetadata = {
      ...metadata,
      ...metadataDTO,
    };

    return this.metadataService.updateMetadata(metadataId, modifiedMetadata);
  }

  @Roles(Role.Admin)
  @Post(':id/add-users')
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

  @Roles(Role.Admin)
  @Get(':id/metadata')
  async getAllMetadatasByProject(@Param('id') idProject: string) {
    const project = await this.projectService.findProject(idProject);
    return this.metadataService.getMetadataByProject(project);
  }

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
  @Post('remove-metadata')
  async removeMetadata(@Body() dto: RemoveMetadataDTO) {
    const project = await this.projectService.findProject(dto.projectId);
    project.metadata = project.metadata.filter(
      (meta) => meta._id.toString() !== dto.metadataId,
    );
    const updated = await this.projectService.updateProject(
      project.identNumber,
      project,
    );
    return updated;
  }

  @Roles(Role.Admin)
  @Post('remove-user')
  async removeUser(@Body() dto: { projectId: string; userId: string }) {
    const project = await this.projectService.findProject(dto.projectId);
    project.users = project.users.filter(
      (user) => user._id.toString() !== dto.userId,
    );
    const updated = await this.projectService.updateProject(
      project.identNumber,
      project,
    );

    return updated;
  }
}
