import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/user/model/user.model";
import mongoose from "mongoose";
import { Types } from "mongoose";


export class UserAndTheirLastResource{



    ordinalNumber: number;
    userId: string;


}

