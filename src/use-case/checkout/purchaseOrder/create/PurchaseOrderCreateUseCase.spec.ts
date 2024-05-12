import { PurchaseOrderFactory } from "../../../../domain/checkout/purchaseOrder/factory/PurchaseOrder.factory"
import PurchaseOrderItemFactory from "../../../../domain/checkout/purchaseOrder/purchaseOrder-item/factory/PurchaseOrder-item.factory"
import PurchaseOrderCreateInDto from "./PurchaseOrderCreateInDto"
import PurchaseOrderCreateUseCase from "./PurchaseOrderCreateUseCase"

describe("test purchaseOrder create use case ",()=>{
    const mock=()=>{
        return {
        findById:jest.fn(),
        create:jest.fn(),
        updateById:jest.fn(),
        deleteById:jest.fn(),
        findAll:jest.fn(),
        findByEmail:jest.fn()
    }
    }
    const mockEmployee=()=>{
        return {
        findById:jest.fn(),
        create:jest.fn(),
        updateById:jest.fn(),
        deleteById:jest.fn(),
        findAll:jest.fn(),
        findByEmail:jest.fn()
    }
    }
    const mockCustomer=()=>{
        return {
        findById:jest.fn(),
        create:jest.fn(),
        updateById:jest.fn(),
        deleteById:jest.fn(),
        findAll:jest.fn(),
        findByEmail:jest.fn()
    }
    }
    const mockProduct=()=>{
        return {
        findById:jest.fn(),
        create:jest.fn(),
        updateById:jest.fn(),
        deleteById:jest.fn(),
        findAll:jest.fn(),
        findByIds:jest.fn()
    }
    }
    it("create purchase order use case",async()=>{
        const usecase=new PurchaseOrderCreateUseCase(mock(),mockProduct(),mockCustomer(),mockEmployee())
        const purchaseOrderCreateDto:PurchaseOrderCreateInDto={
          customer_id:"1",
          employee_id:"1",
          items:[{
            product_id:"1",
            price:100,
            quantity:5,
            total:500
            
          }
        ]  ,
        discount:0       
        }
        
        const result=await usecase.execute(purchaseOrderCreateDto)
        expect(result).toBeUndefined()
    })
})