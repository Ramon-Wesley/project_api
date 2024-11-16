import PurchaseOrderRepositoryInterface from "../../../../domain/checkout/purchaseOrder/repository/PurchaseOrder.repository";

export class PurchaseOrderFindById {

    constructor(private readonly purchaseOrderRepository: PurchaseOrderRepositoryInterface) { }
    async execute(id: string) {
       try {
           return await this.purchaseOrderRepository.findById(id);
       } catch (error) {
           throw error
       }
    }
}