import { GlobalService } from '../global/global.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { ResourceTemplate } from './DTO/ResourceTemplate.dto';
import { currentPageDTO } from './DTO/CurrentPageDTO.dto';
import { User } from 'src/user/model/user.model';
import {
  Resource,
  ResourceDocument,
  ResourceSchema,
} from './model/resource.model';
import { Project } from 'src/project/models/project.model';
import { checkResourcesDbConnection } from 'src/global/utils';

@Injectable()
export class ResourceService {
  constructor(
    @InjectModel('resource')
    private readonly resourceModel: Model<ResourceDocument>,
    private readonly globalService: GlobalService,
  ) {}

  async createResource(resource: Resource): Promise<Resource> {
    let connection = this.globalService.getConnection();
    const projectId = resource.project.identNumber;
    connection = checkResourcesDbConnection(connection, projectId);
    this.globalService.setConnection(connection);
    const resourceModel = connection.model('Resource', ResourceSchema);

    const newResource = new resourceModel(resource);
    return newResource.save();
  }

  async findResource(resourceId: ObjectId, projectId: string) {
    let connection = this.globalService.getConnection();
    connection = checkResourcesDbConnection(connection, projectId);
    this.globalService.setConnection(connection);
    const resourceModel = connection.model('Resource', ResourceSchema);

    const resource = <Resource>(
      await resourceModel.findById(resourceId).lean().exec()
    );
    return resource;
  }

  async updateResource(
    resourceId: ObjectId,
    data: Resource,
  ): Promise<Resource> {
    const connection = this.globalService.getConnection();
    const resourceModel = connection.model('Resource', ResourceSchema);

    return resourceModel.findOneAndUpdate({ _id: resourceId }, data, {
      new: true,
    });
  }

  async findByProject(projectId: string) {
    let connection = this.globalService.getConnection();

    // if connection doesn't exist we create connection or close unused connection
    connection = checkResourcesDbConnection(connection, projectId);
    // set connection to globalService
    this.globalService.setConnection(connection);

    // then find all resources in that database and return them
    const resourceModel = connection.model('Resource', ResourceSchema);
    const resources = <Resource[]>await resourceModel
      .find({ deleted: false || undefined })
      .lean()
      .exec();

    return resources;
  }

  async findByOrdinalNumber(nr: number, id: string) {
    const resource = <Resource>await this.resourceModel
      .findOne({ ordinalNumber: nr, project: new ObjectId(id) })
      .lean()
      .exec();
    return resource;
  }

  async createResourceForService(
    template: ResourceTemplate[],
    project: Project,
  ) {
    let number = 0;
    for (const res of template) {
      number++;
      const newResource = new Resource();
      newResource.project = project;
      newResource.text = res.text;
      newResource.title = res.title;
      newResource.ordinalNumber = number;
      await this.createResource(newResource);
    }
  }

  async findCurrentPage(project: Project, user: User) {
    const currentPage = new currentPageDTO();

    for (const p of project.userAndTheirLastResource) {
      if (p.userId === user._id.toString()) {
        currentPage.page = p.ordinalNumber + 1;
      }
    }

    if (project.userAndTheirLastResource.length == 0) {
      currentPage.page = 1;
    }

    const resource = await this.findByProject(project.identNumber);
    currentPage.total = resource.length;

    return currentPage;
  }
}
