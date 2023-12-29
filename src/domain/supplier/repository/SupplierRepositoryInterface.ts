import RepositoryInterface from "../../@shared/repository/RepositoryInterface";
import Supplier from "../entity/Supplier";

export default interface SupplierRepositoryInterface extends RepositoryInterface<Supplier>{
    findByEmail(email:string):Promise<Supplier>
}