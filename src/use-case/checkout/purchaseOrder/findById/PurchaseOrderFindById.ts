import PurchaseOrderRepositoryInterface from "../../../../domain/checkout/purchaseOrder/repository/PurchaseOrder.repository";

export class PurchaseOrderFindById {

    constructor(private readonly purchaseOrderRepository: PurchaseOrderRepositoryInterface) { }
    async execute(id: string) {
       try {
           return await this.purchaseOrderRepository.findById(id);
       } catch (error) {
           const err=error as Error
           throw new Error(err.message)
       }
    }
}