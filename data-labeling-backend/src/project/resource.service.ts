import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Resource, ResourceDocument } from "./models/resource.model";
import { Model } from 'mongoose';


@Injectable()
export class ResourceService {



    constructor(
        @InjectModel("resource") private readonly resourceModel: Model<ResourceDocument>,
    ) {

    }



    async createResource(resource: Resource): Promise<Resource> {
        const newResource = new this.resourceModel(resource);
        return await newResource.save();
    }



    async findResource(id: string) {
        const resource = <Resource>await this.resourceModel.findById(id).lean().exec();
        return resource;
    }

    async updateResource(id, data): Promise<Resource> {
        return await this.resourceModel.findOneAndUpdate({ _id: id }, data, { new: true })
    }

    async findByProject(id) {
        const ObjectId = require('mongodb').ObjectId;
        const resources = <Resource[]>await this.resourceModel.find({
            project: ObjectId(id)
        }).lean().exec();

        return resources;
    }


    async findByOrdinalNumber(nr: number, id: string) {
        const ObjectId = require('mongodb').ObjectId;
        const resource = <Resource>await this.resourceModel.findOne({ ordinalNumber: nr, project: ObjectId(id) }).lean().exec();
        return resource;
    }







}