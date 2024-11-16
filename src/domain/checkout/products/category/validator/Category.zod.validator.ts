import ValidatorInterface from "../../../../@shared/validator/Validator.interface";
import { GenericZodValidator } from "../../../../@shared/validator/zodValidator/GenericZodValidator";
import Category from "../entity/Category";
import z, { ZodSchema } from "zod"

export default class CategoryZodValidator extends GenericZodValidator<Category>{


    validate(entity: Category): void {
        super.genericValidate(entity, this.generatedSchema(), "category");
      }
      
      private generatedSchema(): ZodSchema {
   
        const validation=z.object({
            id:z.string(),
            name:z.string().trim().min(2,"The category name must be at least 2 characters long!"),
            description:z.string().trim().min(2,"The category description must be at least 2 characters long!"),
        })

        return validation
      }

}