import CategoryZodValidator from "../validator/Category.zod.validator";

export default class CategoryFactoryValidator{
    private constructor(){}

    static create(){
        return new CategoryZodValidator()
    }
}