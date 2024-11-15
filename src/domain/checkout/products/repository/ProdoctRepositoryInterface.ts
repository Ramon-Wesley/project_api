import RepositoryInterface from "../../../@shared/repository/RepositoryInterface";
import Product from "../entity/Product";

export default interface ProductRepositoryInterface extends RepositoryInterface<Product>{
    findByIds(ids:string[]):Promise<Product[]>
    updateQuantity(id:string,quantity:number):Promise<void>
}