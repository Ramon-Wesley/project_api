import ProductZodValidator from "../validator/Product.zod";

export default class ProductFactoryValidator{

    public static create(){
        return new ProductZodValidator();
    }
}