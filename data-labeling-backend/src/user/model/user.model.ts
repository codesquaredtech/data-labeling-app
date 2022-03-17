import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type UserDocument = User & Document;


@Schema()
export class User{

    _id: Types.ObjectId;

    @Prop()
    firstname: string;

    @Prop() 
    lastname: string;

    @Prop() 
    username: string;

    @Prop() 
    password: string;

    @Prop({ required: true, default: 0}) // Is working
    role: Role





}

export enum Role{
    USER, //0
    ADMIN, //1
}

export const UserSchema = SchemaFactory.createForClass(User);