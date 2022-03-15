import {Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { type } from "os";
import { User } from "src/user/model/user.model";
import { Metadata } from "./metamodel.model";


export type ProjectDocument = Project & Document;


@Schema()
export class Project{

    @Prop({ required: true, default: "Some title"}) // Is working
    title: string;

    @Prop()
    description: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'metadata'}]})
    metadata: Metadata[];


    @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }] })
    users: User[];


    ///neka ovo sad za pocetak obican string koji unosi admin /////
    inputFile: string;                                       /////
    outputFile: string;                                      ////
    /////////////////////////////////////////////////////////////


}


export const ProjectSchema = SchemaFactory.createForClass(Project);