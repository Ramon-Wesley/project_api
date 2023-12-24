import { Router } from 'express';

export default class RouterConfig{
    private static route:Router;

    private constructor(){}
    
    static execute():Router{
        if(!this.route){
            this.route=Router()
        }
        return this.route;
    }
}