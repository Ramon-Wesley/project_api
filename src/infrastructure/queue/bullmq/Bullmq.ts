import RedisConnect from "../../cache/redis/config/RedisConfig";
import { MessagesQueue } from "../@shared/MessagesQueue";
import { QueueInterface } from "../@shared/QueueInterface";
import { Queue,Worker } from "bullmq";

export class Bullmq<T extends MessagesQueue> implements QueueInterface <T>  {



   async  produce(queueName:string,queueType:string,delay: number,message: T): Promise<void> {

       const queue = new Queue(queueName, {
         connection: {
           host: process.env.REDIS_HOST || "app-redis",
           port: Number(process.env.REDIS_PORT) || 6379,
           db: Number(process.env.REDIS_DB) || 0,
         },
       });

       await queue.add(queueType, message,{delay:delay,removeOnComplete:queueType==='send'});
            
    }

   async consume(queueName:string,functConsumer: (job: any) => Promise<void>): Promise<void> {
        const worker = new Worker(queueName, async (job) => {
          try {
            await functConsumer(job);
          } catch (error) {
            console.log(error);
          }
          },{
            connection: {
              host: process.env.REDIS_HOST || "app-redis",
              port: Number(process.env.REDIS_PORT) || 6379,
              db: Number(process.env.REDIS_DB) || 0,
            }
          });

          worker.on('completed', (job) => {
            console.log(`Job ${job.id} completed with result ${job.returnvalue}`);
          });

          worker.on('failed', (job, err) => {
            console.log(`Job ${job!.id} failed with error ${err.message}`);
          });
     

}

}