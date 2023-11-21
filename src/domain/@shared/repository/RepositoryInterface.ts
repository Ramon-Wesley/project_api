export default interface RepositoryInterface<T>{
    create(entity:T):Promise<void>;
    findById(id:string):Promise<T>;
    findAll():Promise<T[]>;
    updateById(id:string,entity:T):Promise<void>
    deleteById(id:string):Promise<void>
}