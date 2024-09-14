import { config } from "dotenv";
import ServerExpress from "../express/ServerExpress";

export class ServerFactory{
    private constructor(){} 

    static async execute():Promise<any>{
        config()
        switch (process.env.Server) {
            case "express":
                ServerExpress.execute()
                
                break;
        
            default:
                ServerExpress.execute()
                break;
        }
    }

    }