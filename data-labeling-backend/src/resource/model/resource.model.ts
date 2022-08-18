import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { OutputData } from './outputData.model';
import { Types } from 'mongoose';
import { Project } from 'src/project/models/project.model';

export type ResourceDocument = Resource & Document;

@Schema()
export class Resource {
  _id: Types.ObjectId;

  @Prop()
  text: string;

  @Prop()
  title: string;

  @Prop()
  outputFields: OutputData[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'project' })
  project: Project;

  @Prop()
  ordinalNumber: number;

  @Prop()
  dataSource: string;

  @Prop()
  deleted: boolean;
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);
