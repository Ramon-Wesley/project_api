import {v4 as uuid} from "uuid"
import SchedulingServices from "../entity/SchedulingServices"

export default class SchedulingFactory{
    private constructor(){}
    static create(name:string,price:number){
        return new SchedulingServices(uuid(),name,price);
    }
}