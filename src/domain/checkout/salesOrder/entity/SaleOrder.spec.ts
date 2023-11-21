import SaleOrderItem from "../saleOrder-item/entity/SaleOrder-item"
import SaleOrder from "./SaleOrder"

describe("test the order entity",()=>{

    it("correctly enter order data",()=>{
      
    
        const order={
            id:"123",
            supplier_id:"123",
            employee_id:"123",
        }
        const orderItem=new SaleOrderItem(
            "321",
            "123",
            "123",
            10,
            10     
        )
        const orderItem2=new SaleOrderItem(
            "123",
            "123",
            "321",
            10,
            20      
        )
     
        const orderResult=new SaleOrder(order.id,order.supplier_id,order.employee_id,[orderItem,orderItem2])
        expect(orderResult.Id).toBe(order.id)
        expect(orderResult.Supplier_id).toBe(order.supplier_id)
        expect(orderResult.Employee_id).toBe(order.employee_id)
        expect(orderResult.Total).toBe(300)
        expect(orderResult.SaleOrderItems.length).toBe(2)
        expect(orderResult.SaleOrderItems[0].Id).toBe(orderItem.Id)
        expect(orderResult.SaleOrderItems[0].ProductId).toBe(orderItem.ProductId)
        expect(orderResult.SaleOrderItems[0].SaleOrderId).toBe(orderItem.SaleOrderId)
        expect(orderResult.SaleOrderItems[0].Quantity).toBe(orderItem.Quantity)
        expect(orderResult.SaleOrderItems[0].UnitaryValue).toBe(orderItem.UnitaryValue)
        expect(orderResult.SaleOrderItems[0].Total).toBe(100)
        expect(orderResult.SaleOrderItems[1].Id).toBe(orderItem2.Id)
        expect(orderResult.SaleOrderItems[1].ProductId).toBe(orderItem2.ProductId)
        expect(orderResult.SaleOrderItems[1].SaleOrderId).toBe(orderItem2.SaleOrderId)
        expect(orderResult.SaleOrderItems[1].Quantity).toBe(orderItem2.Quantity)
        expect(orderResult.SaleOrderItems[1].UnitaryValue).toBe(orderItem2.UnitaryValue)
        expect(orderResult.SaleOrderItems[1].Total).toBe(200)

    })

    it("correctly enter order data with 50 percent discount",()=>{
      
        const order={
            id:"123",
            supplier_id:"123",
            employee_id:"123",
        }

        const orderItem=new SaleOrderItem(
            "321",
            "123",
            "123",
            10,
            10     
        )

        const orderItem2=new SaleOrderItem(
            "123",
            "123",
            "321",
            10,
            20      
        )
     
        const orderResult=new SaleOrder(order.id,order.supplier_id,order.employee_id,[orderItem,orderItem2])
        orderResult.changeDiscount(50)
        expect(orderResult.Id).toBe(order.id)
        expect(orderResult.Supplier_id).toBe(order.supplier_id)
        expect(orderResult.Employee_id).toBe(order.employee_id)
        expect(orderResult.Total).toBe(150)
        expect(orderResult.Discount).toBe(50)
        expect(orderResult.SaleOrderItems.length).toBe(2)
        expect(orderResult.SaleOrderItems[0].Id).toBe(orderItem.Id)
        expect(orderResult.SaleOrderItems[0].ProductId).toBe(orderItem.ProductId)
        expect(orderResult.SaleOrderItems[0].SaleOrderId).toBe(orderItem.SaleOrderId)
        expect(orderResult.SaleOrderItems[0].Quantity).toBe(orderItem.Quantity)
        expect(orderResult.SaleOrderItems[0].UnitaryValue).toBe(orderItem.UnitaryValue)
        expect(orderResult.SaleOrderItems[0].Total).toBe(100)
        expect(orderResult.SaleOrderItems[1].Id).toBe(orderItem2.Id)
        expect(orderResult.SaleOrderItems[1].ProductId).toBe(orderItem2.ProductId)
        expect(orderResult.SaleOrderItems[1].SaleOrderId).toBe(orderItem2.SaleOrderId)
        expect(orderResult.SaleOrderItems[1].Quantity).toBe(orderItem2.Quantity)
        expect(orderResult.SaleOrderItems[1].UnitaryValue).toBe(orderItem2.UnitaryValue)
        expect(orderResult.SaleOrderItems[1].Total).toBe(200)

    })

    it("insert order item data empty",()=>{
      
        const order={
            id:"123",
            supplier_id:"123",
            employee_id:"123",
        }

        const orderItem=new SaleOrderItem(
            "321",
            "123",
            "123",
            10,
            10     
        )

        const orderItem2=new SaleOrderItem(
            "123",
            "123",
            "321",
            10,
            20      
        )
     
        expect(()=>new SaleOrder(order.id,order.supplier_id,order.employee_id,[]))
        .toThrow("saleOrder: Invalid input");

    })

    it("enter order data with supplier_id and employee_id empty",()=>{
      
        const order={
            id:"123",
            supplier_id:"",
            employee_id:"",
        }

        const orderItem=new SaleOrderItem(
            "321",
            "123",
            "123",
            10,
            10     
        )
        const orderItem2=new SaleOrderItem(
            "123",
            "123",
            "321",
            10,
            20      
        )
     
        expect(new SaleOrder(order.id,order.supplier_id,order.employee_id,[orderItem,orderItem2]))
        .toThrow("saleOrder: invalid Supplier_id!,saleOrder: invalid Employee_id")
        

    })
  


})