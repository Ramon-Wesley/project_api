import SalesOrderItem from "../salesOrder-item/entity/SalesOrder-item"
import SalesOrder from "./SalesOrder"

describe("test the order entity",()=>{

    it("correctly enter order data",()=>{
      
    
        const order={
            id:"123",
            customer_id:"123",
            employee_id:"123",
        }
        const orderItem=new SalesOrderItem(
            "321",
            "123",
            10,
            10     
        )
        const orderItem2=new SalesOrderItem(
            "123",
            "321",
            10,
            20      
        )
     
        const orderResult=new SalesOrder(order.id,order.customer_id,order.employee_id,[orderItem,orderItem2])
        expect(orderResult.Id).toBe(order.id)
        expect(orderResult.Customer_id).toBe(order.customer_id)
        expect(orderResult.Employee_id).toBe(order.employee_id)
        expect(orderResult.Total).toBe(300)
        expect(orderResult.SalesOrderItems.length).toBe(2)
        expect(orderResult.SalesOrderItems[0].Id).toBe(orderItem.Id)
        expect(orderResult.SalesOrderItems[0].ProductId).toBe(orderItem.ProductId)
        expect(orderResult.SalesOrderItems[0].Quantity).toBe(orderItem.Quantity)
        expect(orderResult.SalesOrderItems[0].UnitaryValue).toBe(orderItem.UnitaryValue)
        expect(orderResult.SalesOrderItems[0].Total).toBe(100)
        expect(orderResult.SalesOrderItems[1].Id).toBe(orderItem2.Id)
        expect(orderResult.SalesOrderItems[1].ProductId).toBe(orderItem2.ProductId)
        expect(orderResult.SalesOrderItems[1].Quantity).toBe(orderItem2.Quantity)
        expect(orderResult.SalesOrderItems[1].UnitaryValue).toBe(orderItem2.UnitaryValue)
        expect(orderResult.SalesOrderItems[1].Total).toBe(200)

    })

    it("correctly enter order data with 60 percent discount",()=>{
      
        const order={
            id:"123",
            customer_id:"123",
            employee_id:"123",
        }

        const orderItem=new SalesOrderItem(
            "321",
            "123",
            10,
            10     
        )

        const orderItem2=new SalesOrderItem(
            "123",
            "321",
            10,
            20      
        )
     
        const orderResult=new SalesOrder(order.id,order.customer_id,order.employee_id,[orderItem,orderItem2])
        orderResult.changeDiscount(60)
        expect(orderResult.Id).toBe(order.id)
        expect(orderResult.Customer_id).toBe(order.customer_id)
        expect(orderResult.Employee_id).toBe(order.employee_id)
        expect(orderResult.Total).toBe(120)
        expect(orderResult.Discount).toBe(60)
        expect(orderResult.SalesOrderItems.length).toBe(2)
        expect(orderResult.SalesOrderItems[0].Id).toBe(orderItem.Id)
        expect(orderResult.SalesOrderItems[0].ProductId).toBe(orderItem.ProductId)
        expect(orderResult.SalesOrderItems[0].Quantity).toBe(orderItem.Quantity)
        expect(orderResult.SalesOrderItems[0].UnitaryValue).toBe(orderItem.UnitaryValue)
        expect(orderResult.SalesOrderItems[0].Total).toBe(100)
        expect(orderResult.SalesOrderItems[1].Id).toBe(orderItem2.Id)
        expect(orderResult.SalesOrderItems[1].ProductId).toBe(orderItem2.ProductId)
        expect(orderResult.SalesOrderItems[1].Quantity).toBe(orderItem2.Quantity)
        expect(orderResult.SalesOrderItems[1].UnitaryValue).toBe(orderItem2.UnitaryValue)
        expect(orderResult.SalesOrderItems[1].Total).toBe(200)

    })

    it("insert order item data empty",()=>{
      
        const order={
            id:"123",
            customer_id:"123",
            employee_id:"123",
        }

      0      
        expect(()=>new SalesOrder(order.id,order.customer_id,order.employee_id,[]))
        .toThrow("salesOrder: The salesItems must not be less than zero!");

    })

    it("enter order data with customer_id and employee_id empty",()=>{
      
        const order={
            id:"123",
            customer_id:" ",
            employee_id:" ",
        }

        const orderItem=new SalesOrderItem(
            "321",
            "123",
            10,
            10     
        )
        const orderItem2=new SalesOrderItem(
            "123",
            "321",
            10,
            20      
        )
     
        expect(()=>new SalesOrder(order.id,order.customer_id,order.employee_id,[orderItem,orderItem2]))
        .toThrow("salesOrder: Invalid Customer_id!,salesOrder: Invalid Employee_id!")
        

    })
  


})