import { SalesOrderFactory } from "../../../../domain/checkout/salesOrder/factory/SalesOrder.factory"
import salesOrderItemFactory from "../../../../domain/checkout/salesOrder/salesOrder-item/factory/SalesOrder-item.factory"
import salesOrderCreateInDto from "./SalesOrderCreateInDto"
import salesOrderCreateUseCase from "./SalesOrderCreateUseCase"

describe("test salesOrder create use case ",()=>{
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
    it("create sales order use case",async()=>{
        const usecase=new salesOrderCreateUseCase(mock(),mockProduct(),mockCustomer(),mockEmployee())
        const salesOrderCreateDto:salesOrderCreateInDto={
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
        
        const result=await usecase.execute(salesOrderCreateDto)
        expect(result).toBeUndefined()
    })
})