import {createClient,RedisClientType} from "redis"



export default class RedisConnect{
    private static client:RedisClientType|undefined;
    private constructor(){}

  static async execute(){
    try {
            this.client= createClient({
              socket:{
                host: process.env.CACHE_HOST,
                port: Number(process.env.CACHE_PORT) || 6379,
              }
            });
            this.client.on('error', err => console.log('Redis Client Error', err));
            await this.client.connect();   
            return this.client
        
    } catch (error) {
        throw error

    }
    }
}