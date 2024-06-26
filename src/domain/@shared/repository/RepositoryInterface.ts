import Entity from "../entity/Entity";
import RepositoryFindAllResult from "./RepositoryFindAllResult";

export default interface RepositoryInterface<T extends Entity>{
    create(entity:T):Promise<void>;
    findById(id:string):Promise<T>;
    findAll(sort:"desc"|"asc",filter:string,limit:number,page:number):Promise<RepositoryFindAllResult<T>>;
    updateById(id:string,entity:T):Promise<void>
    deleteById(id:string):Promise<void>
    
}