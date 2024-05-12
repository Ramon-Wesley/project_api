import RepositoryInterface from "../../../@shared/repository/RepositoryInterface";
import Product from "../../products/entity/Product";
import PurchaseOrder from "../entity/PurchaseOrder";

export default interface PurchaseOrderRepositoryInterface extends Omit<Omit<RepositoryInterface<PurchaseOrder>, 'create'>, 'updateById'>{
    create(entity: PurchaseOrder, products: Product[]): Promise<void>
    updateById(id:string,entity:PurchaseOrder,products:Product[]):Promise<void>
}