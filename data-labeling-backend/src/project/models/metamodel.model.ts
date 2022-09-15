import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

@Schema()
export class Metadata {
  _id: ObjectId;

  @Prop()
  name: string; //field_label

  @Prop()
  type: string; //field_type

  value?: string | boolean;
}
