import Redis from "../redis/Redis";
import {config} from "dotenv"

export default class CacheFactory{

    static  execute(){
        config()
        switch(process.env.CACHE){
            case "redis":
                return  new Redis();
            break;
            default: 
              return  new Redis();
        }
    }
}