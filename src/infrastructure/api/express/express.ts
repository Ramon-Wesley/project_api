import express,{ Express } from "express"
import DbFactory from "../../db/factory/DbFactory";
import {router} from "../routes"
import cors from "cors"

export default class ExpressConfig{
    
    private static app:Express=express();

    private constructor(){}

     static async execute():Promise<Express>{
        this.app.use(express.json());
        this.app.use(cors())
        this.app.use(router);
        await DbFactory.execute();
        return this.app
    }
}