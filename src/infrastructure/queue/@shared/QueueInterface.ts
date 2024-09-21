export interface QueueInterface <T> {
    produce(queueName:string,queueType:string,delay: number,message: T): Promise<void>;
    consume(queueName:string,methodConsumer: (job: any) => Promise<void>): Promise<void>;
   
}