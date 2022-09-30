import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { OutputData } from 'src/resource/model/outputData.model';
import { Resource } from 'src/resource/model/resource.model';
import { ResourceService } from 'src/resource/resource.service';
import { User } from 'src/user/model/user.model';
import { UserService } from 'src/user/user.service';
import { ProjectMetadataDTO } from './DTO/ProjectMetadata.dto';
import { ProjectTemplateDTO } from './DTO/ProjectTemplate.dto';
import { Project, ProjectDocument } from './models/project.model';
import { UserAndTheirLastResource } from './models/userLastResource.model';
import { UsersProjectDto } from './DTO/UsersProject.dto';
import { Metadata } from './models/metamodel.model';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel('project')
    private readonly projectModel: Model<ProjectDocument>,
    private readonly userService: UserService,
    private readonly resourceService: ResourceService,
  ) {}

  async createProject(project: Project): Promise<Project> {
    const newProject = new this.projectModel(project);
    return newProject.save();
  }

  async getAllProjects() {
    const projects = <Project[]>await this.projectModel.find({}).lean().exec();
    return projects;
  }

  async findProject(id) {
    const project = <Project>(
      await this.projectModel.findOne({ identNumber: id }).lean().exec()
    );
    if (!project) {
      throw new NotFoundException('Could not find project!');
    }
    return project;
  }

  async findByUser(id): Promise<Project[]> {
    const projectList = <Project[]>await this.projectModel
      .find({
        users: new ObjectId(id),
      })
      .lean()
      .exec();

    return projectList;
  }

  async updateProject(id, data): Promise<Project> {
    return await this.projectModel.findOneAndUpdate({ identNumber: id }, data, {
      new: true,
    });
  }

  async createUserLastResource(
    ordinalNumber: number,
    project: Project,
    user: User,
  ) {
    const userAndTheirLastResource = new UserAndTheirLastResource();
    userAndTheirLastResource.ordinalNumber = ordinalNumber;
    userAndTheirLastResource.userId = user._id;
    project.userAndTheirLastResource.push(userAndTheirLastResource);
    const updatedProject = await this.updateProject(
      project.identNumber,
      project,
    );
    console.log(updatedProject);
  }

  async updateUsersLastResource(
    resource: Resource,
    project: Project,
    user: User,
  ) {
    let usersLastResource = project.userAndTheirLastResource.find(
      (u) => user._id.equals(u.userId)
    );
    if (!usersLastResource) {
      usersLastResource = new UserAndTheirLastResource();
      usersLastResource.userId = user._id;
      project.userAndTheirLastResource.push(usersLastResource);
    }

    if (resource.ordinalNumber <= usersLastResource.ordinalNumber) {
      return;
    }

    usersLastResource.ordinalNumber = resource.ordinalNumber;
    await this.updateProject(project.identNumber, project);
  }

  async createProjectFromTemplate(projectTemplate: ProjectTemplateDTO) {
    const project = new Project();
    project.title = projectTemplate.title;
    project.description = projectTemplate.description;
    project.identNumber = projectTemplate.identNumber;
    project.numberOfResources = 0;
    project.users = [];
    project.metadata = [];
    this.createProject(project);
  }

  async getProjectByUsers(userId: ObjectId) {
    const projects = await this.findByUser(userId);
    return projects.map((p) => {
      const usersLastResource = p.userAndTheirLastResource.find(
        (u) => u.userId == userId,
      );
      const dto = new UsersProjectDto();
      dto.id = p.identNumber;
      dto.title = p.title;
      dto.description = p.description;
      dto.numberOfResources = p.numberOfResources || 0;
      dto.usersLastResource = usersLastResource?.ordinalNumber || 0;
      return dto;
    });
  }

  async acceptLabeledData(
    resource: Resource,
    project: Project,
    user: User,
    body: ProjectMetadataDTO,
  ) {
    resource.outputFields = resource.outputFields?.filter((f) => !user._id.equals(f.userId)) || []

    for (const metadata of body.fields) {
      const outputFields = new OutputData();
      outputFields.name = metadata.name;
      outputFields.type = metadata.type;
      outputFields.value = metadata.value;
      outputFields.userId = user._id;
      if (outputFields.value == null) {
        outputFields.value = false;
      }
      resource.outputFields.push(outputFields);
    }

    await this.resourceService.updateResource(
      project.identNumber,
      resource._id,
      resource,
    );
    await this.updateUsersLastResource(resource, project, user);
  }

  async createMetadata(projectId: string, metadata: Metadata) {
    const project = await this.findProject(projectId);
    metadata._id = new ObjectId();
    project.metadata.push(metadata);
    return await this.updateProject(projectId, project);
  }

  async deleteMetadata(projectId: string, id: string) {
    const project = await this.findProject(projectId);
    project.metadata = project.metadata.filter(
      (md) => md._id.toString() !== id,
    );
    return await this.updateProject(projectId, project);
  }

  async updateMetadata(projectId, id, dto): Promise<Project> {
    const project = await this.findProject(projectId);
    project.metadata = project.metadata.map((md) =>
      md._id.toString() === id ? { ...md, ...dto } : md,
    );
    return await this.updateProject(projectId, project);
  }

  async getMetadataOptions(
    project: Project,
    resource: Resource,
    resourceList: Resource[],
  ) {
    const metadataProjectDTO = new ProjectMetadataDTO();
    metadataProjectDTO.fields = project.metadata;
    metadataProjectDTO.projectId = project.identNumber;
    metadataProjectDTO.text = resource.text;
    metadataProjectDTO.title = resource.title;
    metadataProjectDTO.totalNumber = resourceList.length;
    metadataProjectDTO.ordinalNumber = resource.ordinalNumber;

    return metadataProjectDTO;
  }
}
