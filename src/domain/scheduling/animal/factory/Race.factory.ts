import { v4 as uuidv4 } from 'uuid';
import Race from "../entity/Race";

export default class RaceFactory{

    static create( name:string):Race
        {
            const id=uuidv4()
            return new Race(id,name)
        }
}