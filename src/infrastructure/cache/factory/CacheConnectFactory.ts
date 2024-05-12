import RedisConnect from "../redis/config/RedisConfig";


export default class CacheConnectFactory{

    static  execute(){
        switch(process.env.CACHE){
            case "redis":
                return RedisConnect.execute();
            break;
            default: 
              return RedisConnect.execute();
        }
    }
}