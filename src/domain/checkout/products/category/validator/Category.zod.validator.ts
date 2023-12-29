import ValidatorInterface from "../../../../@shared/validator/Validator.interface";
import Category from "../entity/Category";
import z from "zod"

export default class CategoryZodValidator implements ValidatorInterface<Category>{

    validate(entity: Category): void {
        const validation=z.object({
            id:z.string(),
            name:z.string().trim().min(2,"The category name must be at least 2 characters long!"),
            description:z.string().trim().min(2,"The category description must be at least 2 characters long!"),
        })

        try {
            validation.parse(entity)
        } catch (error) {
            entity.getNotification().getErrors().forEach((res)=>{
                
            })            
        }
    }


}