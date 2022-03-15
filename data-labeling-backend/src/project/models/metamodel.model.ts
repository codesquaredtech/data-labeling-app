import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document} from 'mongoose';


export type MetadataDocument = Metadata & Document;

@Schema()
export class Metadata{



    @Prop()
    name: string;

    @Prop()
    type: SupportedTypes;


}

export enum SupportedTypes{

    BOOLEAN,
    NUMBER,
    STRING,
    RANGE

}


export const MetadataSchema = SchemaFactory.createForClass(Metadata); 
