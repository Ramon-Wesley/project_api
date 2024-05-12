import { Sequelize } from "sequelize-typescript";
import TransactionInterface from "../../transaction/TransactionInterface";

export default class TransactionSequelize implements TransactionInterface{


   async commit(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    async roolback(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    
}

