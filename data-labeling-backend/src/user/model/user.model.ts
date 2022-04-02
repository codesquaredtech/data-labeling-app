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

    @Prop()
    email: string;

    @Prop()
    uuid: string;

    @Prop()
    roles: Role[]





}

export enum Role{
    User = "user",
    Admin = "admin"
}


export const UserSchema = SchemaFactory.createForClass(User);