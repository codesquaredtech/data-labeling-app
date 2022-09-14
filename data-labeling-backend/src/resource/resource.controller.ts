import { ResourceTemplate } from './DTO/ResourceTemplate.dto';
import { Role } from './../user/model/user.model';
import { FirebaseAuthGuard } from './../auth/firebase.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ResourceService } from './resource.service';
import { Roles } from 'src/auth/roles.decorator';
import { ProjectService } from 'src/project/project.service';
import { UserService } from 'src/user/user.service';
import { MetadataService } from 'src/project/metadata.service';
import { ProjectMetadataDTO } from 'src/project/DTO/ProjectMetadata.dto';
import { ObjectId } from 'mongodb';

@Controller('resource')
@UseGuards(FirebaseAuthGuard)
export class ResourceController {
  constructor(
    private readonly resourceService: ResourceService,
    private readonly projectService: ProjectService,
    private readonly metadataService: MetadataService,
    private readonly userService: UserService,
  ) {}

  @Get(':id/all')
  async getProjectResources(@Param('id') projectId: string) {
    return await this.resourceService.findByProject(projectId);
  }

  @Roles(Role.Admin)
  @Post(':id/create')
  async createResourceForProject(
    @Param('id') projectId: string,
    @Body() template: ResourceTemplate[],
  ) {
    const project = await this.projectService.findProject(projectId);

    return await this.resourceService.createResourceForService(
      template,
      project,
    );
  }

  @Roles(Role.Admin)
  @Post(':id/update')
  async updateResource(
    @Param('id') resourceId: ObjectId,
    @Body()
    {
      data,
      projectId,
    }: { data: { title: string; text: string }; projectId: string },
  ) {
    const resource = await this.resourceService.findResource(
      resourceId,
      projectId,
    );

    const modifiedResource = {
      ...resource,
      ...data,
    };

    return this.resourceService.updateResource(
      projectId,
      resourceId,
      modifiedResource,
    );
  }

  @Roles(Role.Admin)
  @Post(':id/remove')
  async removeResource(
    @Param('id') resourceId: ObjectId,
    @Body()
    { projectId }: { projectId: string },
  ) {
    const resource = await this.resourceService.findResource(
      resourceId,
      projectId,
    );

    resource.deleted = true;

    const updated = await this.resourceService.updateResource(
      projectId,
      resourceId,
      resource,
    );

    return updated;
  }

  @Roles(Role.User)
  @Get(':id/label-project/:number')
  async getLabelOptions(
    @Req() req,
    @Param('id') id: string,
    @Param('number') numberOfResource: number,
  ) {
    const project = await this.projectService.findProject(id);
    const resource = await this.resourceService.findByOrdinalNumber(
      project.identNumber,
      numberOfResource,
      project._id.toString(),
    );
    const resourceList = await this.resourceService.findByProject(
      project.identNumber,
    );

    return await this.metadataService.getMetadataOptions(
      project,
      resource,
      resourceList,
    );
  }

  @Roles(Role.User)
  @Get(':id/current-page')
  async findCurrentPage(@Req() req, @Param('id') projectId: string) {
    const user = await this.userService.findUserByUid(req.user.user_id);
    const project = await this.projectService.findProject(projectId);

    return await this.resourceService.findCurrentPage(project, user);
  }

  @Roles(Role.User)
  @Post(':id/data-accept')
  async labeledDataAccepting(
    @Req() req,
    @Param('id') projectId: string,
    @Body() body: ProjectMetadataDTO,
  ) {
    const project = await this.projectService.findProject(projectId);
    const resource = await this.resourceService.findByOrdinalNumber(
      project.identNumber,
      body.ordinalNumber,
      project._id.toString(),
    );
    const user = await this.userService.findUserByUid(req.user.user_id);

    return await this.projectService.acceptLabeledData(
      resource,
      project,
      user,
      body,
    );
  }
}
