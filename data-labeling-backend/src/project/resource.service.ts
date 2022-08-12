import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Resource, ResourceDocument } from './models/resource.model';
import { Model } from 'mongoose';
import { ResourceTemplate } from './DTO/ResourceTemplate.dto';
import { Project } from './models/project.model';
import { currentPageDTO } from './DTO/CurrentPageDTO.dto';
import { User } from 'src/user/model/user.model';

@Injectable()
export class ResourceService {
  constructor(
    @InjectModel('resource')
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
    const ObjectId = require('mongodb').ObjectId;
    const resources = <Resource[]>await this.resourceModel
      .find({
        project: ObjectId(id),
      })
      .lean()
      .exec();

    return resources;
  }

  async findByOrdinalNumber(nr: number, id: string) {
    const ObjectId = require('mongodb').ObjectId;
    const resource = <Resource>await this.resourceModel
      .findOne({ ordinalNumber: nr, project: ObjectId(id) })
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
