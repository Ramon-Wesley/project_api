import { Bullmq } from "../bullmq/Bullmq";

export class QueueFactory {

    static execute(){
        switch (process.env.QUEUE_TYPE) {
            case 'bullmq':
                return new Bullmq();
                
        
            default:
                return new Bullmq();
                
        }
    }
}