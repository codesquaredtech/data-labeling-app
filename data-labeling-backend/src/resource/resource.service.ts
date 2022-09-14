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

@Injectable()
export class ResourceService {
  constructor(
    @InjectModel('resource')
    private readonly resourceModel: Model<ResourceDocument>,
    private readonly globalService: GlobalService,
  ) {}

  async createResource(resource: Resource): Promise<Resource> {
    const projectId = resource.project.identNumber;
    const connection = await this.globalService.getConnection(projectId);

    const resourceModel = connection.model('Resource', ResourceSchema);
    const newResource = new resourceModel(resource);
    return newResource.save();
  }

  async findResource(resourceId: ObjectId, projectId: string) {
    const connection = await this.globalService.getConnection(projectId);

    const resourceModel = connection.model('Resource', ResourceSchema);
    const resource = <Resource>(
      await resourceModel.findById(resourceId).lean().exec()
    );
    return resource;
  }

  async updateResource(
    projectId: string,
    resourceId: ObjectId,
    data: Resource,
  ): Promise<Resource> {
    const connection = await this.globalService.getConnection(projectId);
    const resourceModel = connection.model('Resource', ResourceSchema);

    return resourceModel.findOneAndUpdate({ _id: resourceId }, data, {
      new: true,
    });
  }

  async findByProject(projectId: string) {
    const connection = await this.globalService.getConnection(projectId);

    const resourceModel = connection.model('Resource', ResourceSchema);
    const resources = <Resource[]>await resourceModel
      .find({ deleted: false || undefined })
      .lean()
      .exec();

    return resources;
  }

  async findByOrdinalNumber(projectId: string, nr: number, id: string) {
    const connection = await this.globalService.getConnection(projectId);
    const resourceModel = connection.model('Resource', ResourceSchema);
    const resource = <Resource>await resourceModel
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
    const usersLastResource = project.userAndTheirLastResource.find(r => r.userId === user._id);
    currentPage.page = (usersLastResource?.ordinalNumber || 0) + 1;

    const resources = await this.findByProject(project.identNumber);
    resources.forEach(r => {
      r.outputFields = r.outputFields.filter(f => f.userId === user._id);
    })
    currentPage.resources = resources;

    return currentPage;
  }
}
