import AnimalZodValidator from "../validator/Animal.zod";
import RaceZodValidator from "../validator/Race.zod";

export default class RaceFactoryValidation{

    public static create(){
        return new RaceZodValidator()
    }
}