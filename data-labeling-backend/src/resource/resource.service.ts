import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongodb from 'mongodb';
import { ResourceTemplate } from './DTO/ResourceTemplate.dto';
import { currentPageDTO } from './DTO/CurrentPageDTO.dto';
import { User } from 'src/user/model/user.model';
import { Resource, ResourceDocument } from './model/resource.model';
import { Project } from 'src/project/models/project.model';

@Injectable()
export class ResourceService {
  constructor(
    @InjectModel('resource', 'resourcesDb')
    private readonly resourceModel: Model<ResourceDocument>,
  ) {}

  async createResource(resource: Resource): Promise<Resource> {
    const newResource = new this.resourceModel(resource);
    return await newResource.save();
  }

  async findResource(id: string) {
    const resource = <Resource>(
      await this.resourceModel.findById(id).lean().exec()
    );
    return resource;
  }

  async updateResource(id, data): Promise<Resource> {
    return await this.resourceModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
  }

  async findByProject(id) {
    const ObjectId = mongodb.ObjectId;
    const resources = <Resource[]>await this.resourceModel
      .find({
        project: new ObjectId(id),
      })
      .lean()
      .exec();

    return resources;
  }

  async findByOrdinalNumber(nr: number, id: string) {
    const ObjectId = mongodb.ObjectId;
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

    const resource = await this.findByProject(project._id);
    currentPage.total = resource.length;

    return currentPage;
  }
}
