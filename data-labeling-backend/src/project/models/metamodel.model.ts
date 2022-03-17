import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document} from 'mongoose';

import { Types } from "mongoose";

export type MetadataDocument = Metadata & Document;

@Schema()
export class Metadata{

    _id: Types.ObjectId;

    @Prop()
    name: string;

    @Prop()
    type: string;


}



export const MetadataSchema = SchemaFactory.createForClass(Metadata); 
