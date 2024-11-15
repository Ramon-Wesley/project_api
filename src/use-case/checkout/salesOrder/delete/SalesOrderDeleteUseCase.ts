import SalesOrderRepositoryInterface from "../../../../domain/checkout/salesOrder/repository/SalesOrder.repository";
import useCaseInterface from "../../../@shared/UseCaseInterface";
import { SalesOrderDeleteInDto } from "./SalesOrderDeleteInDto";

export class SalesOrderDeleteUseCase implements useCaseInterface<SalesOrderDeleteInDto,void> {
    constructor(private salesOrderRepository:SalesOrderRepositoryInterface){}
    
   async execute(input: SalesOrderDeleteInDto): Promise<void> {
        try {
            await this.salesOrderRepository.deleteById(input.id);
        } catch (error) {
            const err=error as Error;
            throw new Error(err.message);
        }
    }
}