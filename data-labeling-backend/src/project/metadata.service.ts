import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {Model} from 'mongoose';
import { MetadataDocument } from "./models/metamodel.model";
import { Metadata } from "./models/metamodel.model";


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


}