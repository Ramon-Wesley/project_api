import { UserZodValidator } from "../validator/User.zod.validator";



export default class UserFactoryValidator{

    public static create(){
        return new UserZodValidator();
    }
}