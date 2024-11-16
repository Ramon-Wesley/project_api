import SalesOrderRepositoryInterface from "../../../../domain/checkout/salesOrder/repository/SalesOrder.repository";
import useCaseInterface from "../../../@shared/UseCaseInterface";
import { SalesOrderFindAllInDto } from "./SalesOrderFindAllInDto";
import { SalesOrderFindAllOutDto } from "./SalesOrderFindAllOutDto";

export class SalesOrderFindAllUseCase implements useCaseInterface< SalesOrderFindAllInDto, SalesOrderFindAllOutDto>{
    
    constructor(private readonly salesOrderRepository:SalesOrderRepositoryInterface){}
    async execute(input: SalesOrderFindAllInDto): Promise<SalesOrderFindAllOutDto> {
        try {
            const result= await this.salesOrderRepository.findAll(input.sort,input.filter,input.limit,input.page);  
           
            const findResult:SalesOrderFindAllOutDto={
               entity: result.entity.map((res) =>{return{
                customer_id:res.Customer_id,
                employee_id:res.Employee_id,
                date:res.Data,
                items:res.SalesOrderItems.map((res) =>{return{
                    product_id:res.ProductId,
                    quantity:res.Quantity,
                    price:res.UnitaryValue,
                    total:res.Total
                }
                }),
                discount:res.Discount
            }
        },
            ),
            current_page:result.current_page,
            number_of_elements:result.number_of_elements,
            total_page:result.total_page
            }

            return findResult
        } catch (error) {
            throw error
        }
    }

}