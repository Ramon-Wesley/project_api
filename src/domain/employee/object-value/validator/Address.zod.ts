import BrazilianZipCodeValidator from "../../../@shared/validator/Brazilian.ZipCode.Validator";
import ValidatorInterface from "../../../@shared/validator/Validator.interface";
import Address from "../Address";
import z, { ZodError } from "zod"


export default class AddressZodValidator implements ValidatorInterface<Address>{
    validate(entity: Address): void {
       const validation=z.object({
         uf:z.string().min(2).max(2),
         city:z.string(),
         neighborhood:z.string(),
         zipCode:z.string().refine((value)=>BrazilianZipCodeValidator.validate(value),"invalid ZipCode!"),
         street:z.string().min(1),
         number:z.string().min(1),
         description:z.string()
       })


       try {
        validation.parse({
            uf:entity.Uf,
            city:entity.City,
            neighborhood:entity.Neighborhood,
            zipCode:entity.ZipCode,
            street:entity.Street,
            number:entity.Number,
            description:entity.Description

        })
       } catch (error) {
        const err= error as ZodError

        err.errors.forEach((res)=>{
            entity.getNotification().insertErrors({
                context:"address",
                message:res.message
            })
        })
       }
    }


}