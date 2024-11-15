import SalesOrderRepositoryInterface from "../../../../domain/checkout/salesOrder/repository/SalesOrder.repository";

export class SalesOrderFindById {

    constructor(private readonly salesOrderRepository: SalesOrderRepositoryInterface) { }
    async execute(id: string) {
       try {
           return await this.salesOrderRepository.findById(id);
       } catch (error) {
           const err=error as Error
           throw new Error(err.message)
       }
    }
}