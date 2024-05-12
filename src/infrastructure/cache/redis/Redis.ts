import CacheInterface from "../@shared/CacheInterface";
import RedisConnect from "./config/RedisConfig";

export default class Redis implements CacheInterface{

  async  insertValue(key: string, value: string): Promise<void> {
        try {
            const time=Number(process.env.CACHE_EXP) | 60

            const client=await RedisConnect.execute();
            const getClient=await client.get(key)
            
            if(!getClient){
                await client.setEx(key,time,value);
            }
            
            await client.quit()
        } catch (error) {
            throw error
        }
    }

   async getValue(key: string): Promise<string|null> {
        try {
            const client=await RedisConnect.execute();
            const result=await client.get(key);
            await client.quit()
            return result
        } catch (error) {
            throw error
        }
    }

}