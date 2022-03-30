import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ServiceAccount } from "firebase-admin";
import { ExtractJwt, Strategy } from "passport-firebase-jwt";

import admin from "firebase-admin";


import * as firebaseConfig from "../firebase-config.json"

var serviceAccount = <ServiceAccount>firebaseConfig;

const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})


@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, "firebase-auth"){


    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }



    async validate(token: string){
        const firebaseUser: any =  await this.returnFirebaseUserForToken(token);
        if(!firebaseUser){
            throw new UnauthorizedException();
        }
        return firebaseUser;

    
    }


    async returnFirebaseUserForToken(token: string):Promise<any>{
        return await firebaseApp
            .auth()
            .verifyIdToken(token, true)
            .catch((err) => {
                throw new UnauthorizedException(err.message);
            })
    }





}