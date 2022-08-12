import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { OutputData } from './dataAccepting.model';
import { Project } from './project.model';
import { Types } from 'mongoose';

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
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);
