import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {Model} from 'mongoose';
import { ProjectMetadataDTO } from "./DTO/ProjectMetadata.dto";
import { MetadataDocument } from "./models/metamodel.model";
import { Metadata } from "./models/metamodel.model";
import { Project } from "./models/project.model";
import { Resource } from "./models/resource.model";


@Injectable()
export class MetadataService{

    constructor(
        @InjectModel("metadata") private readonly metadataModel: Model<MetadataDocument>
    ){

    }


    async createMetadata(metadata:Metadata){
        const newMetadata = new this.metadataModel(metadata);
        return await newMetadata.save();
    }

    async deleteMetadata(id: string){
        return await this.metadataModel.deleteOne({_id: id});
    }

    async findById(id: string){
        const metadata = <Metadata> await this.metadataModel.findById(id).lean().exec();
        return metadata;
    }

    async getMetadataByProject(project : Project){
        let listMetadatas = [];
        for (const metadata of project.metadata) {
          listMetadatas.push(await this.findById(metadata._id.toString()))
    
        }
    
        return listMetadatas;
    }

    async getMetadataOptions(project: Project, resource: Resource, resourceList: Resource[]){
        let metadataProjectDTO = new ProjectMetadataDTO();
        metadataProjectDTO.fields = [];
    
        for (const m of project.metadata) {
          let metadata = await this.findById(m._id.toString());
          metadataProjectDTO.fields.push(metadata);
        }
    
          metadataProjectDTO.projectId = project.identNumber;
          metadataProjectDTO.text = resource.text;
          metadataProjectDTO.title = resource.title;
          metadataProjectDTO.totalNumber = resourceList.length;
          metadataProjectDTO.ordinalNumber = resource.ordinalNumber;


          return metadataProjectDTO;
    }





}