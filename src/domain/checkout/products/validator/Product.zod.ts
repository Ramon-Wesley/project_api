import ValidatorInterface from "../../../@shared/validator/Validator.interface";
import Product from "../entity/Product";
import z, { ZodError } from "zod";

export default class ProductZodValidator implements ValidatorInterface<Product>{
 
 
    validate(entity: Product): void {
        const validation=z.object({
            id:z.string().trim().min(1,"Invalid product Id!"),
            name:z.string().trim().min(2,"The product name must be at least 2 characters long!"),
            price:z.number().min(0,"The product price must not be less than zero!"),
            quantity:z.number().min(0,"The product quantity must not be less than zero!"),
            category_id:z.string().trim().min(1,"Invalid category Id!")
        })

        try {
        validation.parse(entity)
        } catch (error) {
            const err=error as ZodError

            err.errors.forEach((res)=>{
                entity.getNotification().insertErrors({
                    context:"product",
                    message:res.message
                })
            })
        }
    }


}