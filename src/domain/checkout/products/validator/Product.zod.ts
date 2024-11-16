import ValidatorInterface from "../../../@shared/validator/Validator.interface";
import { GenericZodValidator } from "../../../@shared/validator/zodValidator/GenericZodValidator";
import Product from "../entity/Product";
import z, { ZodSchema } from "zod";

export default class ProductZodValidator extends GenericZodValidator<Product>  implements ValidatorInterface<Product> {
 
    validate(entity: Product): void {
        super.genericValidate(entity, this.generatedSchema(), "product");
      }
      private generatedSchema(): ZodSchema {
        const validation=z.object({
            id:z.string().trim().min(1,"Invalid product Id!"),
            name:z.string().trim().min(2,"The product name must be at least 2 characters long!"),
            price:z.number().min(0,"The product price must not be less than zero!"),
            quantity:z.number().min(0,"The product quantity must not be less than zero!"),
            category_id:z.string().trim().min(1,"Invalid category Id!")
        })

        return validation
      }

}