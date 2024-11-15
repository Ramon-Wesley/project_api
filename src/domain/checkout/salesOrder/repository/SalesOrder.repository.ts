import RepositoryInterface from "../../../@shared/repository/RepositoryInterface";
import Product from "../../products/entity/Product";
import SalesOrder from "../entity/SalesOrder";

export default interface SalesOrderRepositoryInterface extends Omit<Omit<RepositoryInterface<SalesOrder>, 'create'>, 'updateById'>{
    create(entity: SalesOrder, products: Product[]): Promise<void>
    updateById(id:string,entity:SalesOrder,products:Product[]):Promise<void>
}