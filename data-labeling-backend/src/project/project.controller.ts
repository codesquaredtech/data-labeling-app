import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { response } from 'express';
import { Role, User } from 'src/user/model/user.model';
import { UserService } from 'src/user/user.service';
import { OutputData } from './models/dataAccepting.model';
import { ProjectMetadataDTO } from './DTO/ProjectMetadata.dto';
import { ProjectTemplateDTO } from './DTO/ProjectTemplate.dto';
import { RemoveMetadataDTO } from './DTO/removeMetadata.dto';
import { ResourceTemplate } from './DTO/ResourceTemplate.dto';
import { MetadataService } from './metadata.service';
import { Metadata, MetadataDocument } from './models/metamodel.model';
import { Project } from './models/project.model';
import { Resource } from './models/resource.model';
import { ProjectService } from './project.service';
import { ResourceService } from './resource.service';
import { UserAndTheirLastResource } from './models/userLastResource.model';
import { currentPageDTO } from './DTO/CurrentPageDTO.dto';
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
    private readonly resourceService: ResourceService,
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
  @Post(':id/resource')
  async createResourceForProject(
    @Param('id') idProjekta: string,
    @Body() template: ResourceTemplate[],
  ) {
    let project = await this.projectService.findProject(idProjekta);

    return await this.resourceService.createResourceForService(
      template,
      project,
    );
  }

  @Roles(Role.Admin)
  @Post(':id/metadata')
  async createMetadataForProject(
    @Param('id') idProjekta: string,
    @Body() metadata: Metadata,
  ) {
    let project = await this.projectService.findProject(idProjekta);
    let newMetadata = await this.metadataService.createMetadata(metadata);
    project.metadata.push(newMetadata);
    const updated = await this.projectService.updateProject(
      idProjekta,
      project,
    );
    return updated;
  }

  @Roles(Role.Admin)
  @Get(':id/metadata')
  async getAllMetadatasByProject(@Param('id') idProject: string) {
    let project = await this.projectService.findProject(idProject);
    return this.metadataService.getMetadataByProject(project);
  }

  @Roles(Role.Admin)
  @Get(':id/users')
  async getUsersByProject(@Param('id') id: string) {
    let project = await this.projectService.findProject(id);
    let listUsers = [];
    for (const user of project.users) {
      listUsers.push(await this.userService.findUser(user._id.toString()));
    }
    return listUsers;
  }

  @Roles(Role.Admin)
  @Post('remove-metadata')
  async removeMetadata(@Body() dto: RemoveMetadataDTO) {
    let project = await this.projectService.findProject(dto.projectId);
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
  async removeUser(@Body() dto: RemoveMetadataDTO) {
    let project = await this.projectService.findProject(dto.projectId);
    project.users = project.users.filter(
      (user) => user._id.toString() !== dto.metadataId,
    );
    const updated = await this.projectService.updateProject(
      project.identNumber,
      project,
    );

    return updated;
  }

  @Get(':id/resources')
  async getProjectResources(@Param('id') id: string) {
    let project = await this.projectService.findProject(id);
    return await this.resourceService.findByProject(project._id);
  }

  //1.0 START ZA PROJEKAT DOBIJEŠ METAPODATKE
  @Roles(Role.User)
  @Get(':id/label-project/:number')
  async getLabelOptions(
    @Req() req,
    @Param('id') id: string,
    @Param('number') numberOfResource: number,
  ) {
    let project = await this.projectService.findProject(id);
    let resource = await this.resourceService.findByOrdinalNumber(
      numberOfResource,
      project._id.toString(),
    );
    let resourceList = await this.resourceService.findByProject(project._id);

    return await this.metadataService.getMetadataOptions(
      project,
      resource,
      resourceList,
    );
  }

  @Roles(Role.User)
  @Get(':id/current-page')
  async findCurrentPage(@Req() req, @Param('id') id: string) {
    let user = await this.userService.findUserByUid(req.user.user_id);
    let project = await this.projectService.findProject(id);

    return await this.resourceService.findCurrentPage(project, user);
  }

  @Roles(Role.User)
  @Post(':id/data-accept')
  async labeledDataAccepting(
    @Req() req,
    @Param('id') id: string,
    @Body() body: ProjectMetadataDTO,
  ) {
    let project = await this.projectService.findProject(id);
    let resource = await this.resourceService.findByOrdinalNumber(
      body.ordinalNumber,
      project._id.toString(),
    );
    let user = await this.userService.findUserByUid(req.user.user_id);

    return await this.projectService.acceptLabeledData(
      resource,
      project,
      user,
      body,
    );
  }
}
