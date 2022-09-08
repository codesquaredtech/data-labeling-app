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
    userAndTheirLastResource.userId = user._id.toString();
    project.userAndTheirLastResource.push(userAndTheirLastResource);
    const updatedProject = await this.updateProject(
      project.identNumber,
      project,
    );
    console.log(updatedProject);
  }

  async findIfExist(resource: Resource, project: Project, user: User) {
    for (const labeled of project.userAndTheirLastResource) {
      if (
        labeled.ordinalNumber + 1 == resource.ordinalNumber &&
        labeled.userId == user._id.toString()
      ) {
        return labeled;
      } else {
        return null;
      }
    }
  }

  async createProjectFromTemplate(projectTemplate: ProjectTemplateDTO) {
    const project = new Project();
    project.title = projectTemplate.title;
    project.description = projectTemplate.description;
    project.identNumber = projectTemplate.identNumber;
    project.users = [];
    for (const userId of projectTemplate.users) {
      const user = await this.userService.findUser(userId);
      console.log(user);
      project.users.push(user);
    }
    this.createProject(project);
  }

  async getProjectByUsers(projects: Project[]) {
    const result = [];
    for (const p of projects) {
      const resourceNumberTotal = await this.resourceService.findByProject(
        p.identNumber,
      );
      if (p.userAndTheirLastResource.length == 0) {
        result.push(p);
      } else {
        for (const r of p.userAndTheirLastResource) {
          if (r.ordinalNumber < resourceNumberTotal.length) {
            result.push(p);
          }
        }
      }
    }

    console.log(result);
    return result;
  }

  async acceptLabeledData(
    resource: Resource,
    project: Project,
    user: User,
    body: ProjectMetadataDTO,
  ) {
    if (!resource.outputFields || resource.outputFields.length === 0) {
      resource.outputFields = [];
    }

    for (const b of body.fields) {
      const outputFields = new OutputData();
      outputFields.name = b.name;
      outputFields.type = b.type;
      outputFields.value = b.value;
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
    const labeled = await this.findIfExist(resource, project, user);

    if (labeled == null) {
      this.createUserLastResource(resource.ordinalNumber, project, user);
    } else {
      labeled.ordinalNumber++;
      const updatedProject = await this.updateProject(
        project.identNumber,
        project,
      );
      console.log(updatedProject.userAndTheirLastResource.length);
    }
  }
}
