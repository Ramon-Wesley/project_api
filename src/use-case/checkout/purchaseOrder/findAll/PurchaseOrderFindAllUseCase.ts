import PurchaseOrderRepositoryInterface from "../../../../domain/checkout/purchaseOrder/repository/PurchaseOrder.repository";
import useCaseInterface from "../../../@shared/UseCaseInterface";
import { PurchaseOrderFindAllInDto } from "./PurchaseOrderFindAllInDto";
import { PurchaseOrderFindAllOutDto } from "./PurchaseOrderFindAllOutDto";

export class PurchaseOrderFindAllUseCase implements useCaseInterface< PurchaseOrderFindAllInDto, PurchaseOrderFindAllOutDto>{
    
    constructor(private readonly purchaseOrderRepository:PurchaseOrderRepositoryInterface){}
    async execute(input: PurchaseOrderFindAllInDto): Promise<PurchaseOrderFindAllOutDto> {
        try {
            const result= await this.purchaseOrderRepository.findAll(input.sort,input.filter,input.limit,input.page);  
           
            const findResult:PurchaseOrderFindAllOutDto={
               entity: result.entity.map((res) =>{return{
                supplier_id:res.Supplier_id,
                employee_id:res.Employee_id,
                date:res.Data,
                items:res.PurchaseOrderItems.map((res) =>{return{
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