import { v4 as uuidv4 } from 'uuid';
import Animal from "../entity/Animal";

export default class AnimalFactory{

    static create( customer_id:string,name:string,race_id:string,weight:number,date_of_birth:Date):Animal
        {
            const id=uuidv4()
            return new Animal(id,customer_id,name,race_id,weight,date_of_birth)
        }
}