import {Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { type } from "os";
import { User } from "src/user/model/user.model";
import { Metadata } from "./metamodel.model";
import { Types } from "mongoose";
import { OutputData } from "./dataAccepting.model";
import { UserAndTheirLastResource } from "./userLastResource.model";

export type ProjectDocument = Project & Document;


@Schema()
export class Project{

    _id: Types.ObjectId;


    @Prop({ required: true, default: "Some title"}) // Is working
    title: string;

    @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'metadata' }] })
    metadata: Metadata[];

    @Prop()
    description: string;

    @Prop()
    identNumber:string;


    @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }] })
    users: User[];

    //lista
    @Prop()
    userAndTheirLastResource : UserAndTheirLastResource[];

    //userAndTheirLastResource => objekat[]
    //{userId; resourceOrderNumber: prost podatak}

    //resurs da ima redni broj



}


export const ProjectSchema = SchemaFactory.createForClass(Project);