import AddressZodValidator from "../validator/Address.zod";

export default class AddressFactoryValidator{

    public static create(){
        return new AddressZodValidator();
    }
}