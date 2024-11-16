import PurchaseOrderRepositoryInterface from "../../../../domain/checkout/purchaseOrder/repository/PurchaseOrder.repository";
import useCaseInterface from "../../../@shared/UseCaseInterface";
import { PurchaseOrderDeleteInDto } from "./PurchaseOrderDeleteInDto";

export class PurchaseOrderDeleteUseCase implements useCaseInterface<PurchaseOrderDeleteInDto,void> {
    constructor(private purchaseOrderRepository:PurchaseOrderRepositoryInterface){}
    
   async execute(input: PurchaseOrderDeleteInDto): Promise<void> {
        try {
            await this.purchaseOrderRepository.deleteById(input.id);
        } catch (error) {
            
            throw error
        }
    }
}