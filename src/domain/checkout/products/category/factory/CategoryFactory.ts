import { v4 as uuidv4 } from "uuid";
import Category from "../entity/Category";
export default class CategoryFactory{

    static create(name:string,description:string){
        const uuid=uuidv4()
        return new Category(uuid,name,description)
    }
}
