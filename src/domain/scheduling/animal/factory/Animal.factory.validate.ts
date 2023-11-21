import AnimalZodValidator from "../validator/Animal.zod";

export default class AnimalFactoryValidation{

    public static create(){
        return new AnimalZodValidator()
    }
}