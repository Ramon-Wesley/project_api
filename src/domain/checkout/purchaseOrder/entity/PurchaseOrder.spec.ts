import PurchaseOrderItem from "../purchaseOrder-item/entity/PurchaseOrder-item"
import PurchaseOrder from "./PurchaseOrder"

describe("test the order entity",()=>{

    it("correctly enter order data",()=>{
      
    
        const order={
            id:"123",
            supplier_id:"123",
            employee_id:"123",
        }
        const orderItem=new PurchaseOrderItem(
            "321",
            "123",
            10,
            10     
        )
        const orderItem2=new PurchaseOrderItem(
            "123",
            "321",
            10,
            20      
        )
     
        const orderResult=new PurchaseOrder(order.id,order.supplier_id,order.employee_id,[orderItem,orderItem2])
        expect(orderResult.Id).toBe(order.id)
        expect(orderResult.Supplier_id).toBe(order.supplier_id)
        expect(orderResult.Employee_id).toBe(order.employee_id)
        expect(orderResult.Total).toBe(300)
        expect(orderResult.PurchaseOrderItems.length).toBe(2)
        expect(orderResult.PurchaseOrderItems[0].Id).toBe(orderItem.Id)
        expect(orderResult.PurchaseOrderItems[0].ProductId).toBe(orderItem.ProductId)
        expect(orderResult.PurchaseOrderItems[0].Quantity).toBe(orderItem.Quantity)
        expect(orderResult.PurchaseOrderItems[0].UnitaryValue).toBe(orderItem.UnitaryValue)
        expect(orderResult.PurchaseOrderItems[0].Total).toBe(100)

        expect(orderResult.PurchaseOrderItems[1].Id).toBe(orderItem2.Id)
        expect(orderResult.PurchaseOrderItems[1].ProductId).toBe(orderItem2.ProductId)
        expect(orderResult.PurchaseOrderItems[1].Quantity).toBe(orderItem2.Quantity)
        expect(orderResult.PurchaseOrderItems[1].UnitaryValue).toBe(orderItem2.UnitaryValue)
        expect(orderResult.PurchaseOrderItems[1].Total).toBe(200)

    })

    it("correctly enter order data with 50 percent discount",()=>{
      
        const order={
            id:"123",
            supplier_id:"123",
            employee_id:"123",
        }

        const orderItem=new PurchaseOrderItem(
            "321",
            "123",
            10,
            10     
        )

        const orderItem2=new PurchaseOrderItem(
            "123",
            "321",
            10,
            20      
        )
     
        const orderResult=new PurchaseOrder(order.id,order.supplier_id,order.employee_id,[orderItem,orderItem2])
        orderResult.changeDiscount(50)
        expect(orderResult.Id).toBe(order.id)
        expect(orderResult.Supplier_id).toBe(order.supplier_id)
        expect(orderResult.Employee_id).toBe(order.employee_id)
        expect(orderResult.Total).toBe(150)
        expect(orderResult.Discount).toBe(50)
        expect(orderResult.PurchaseOrderItems.length).toBe(2)
        expect(orderResult.PurchaseOrderItems[0].Id).toBe(orderItem.Id)
        expect(orderResult.PurchaseOrderItems[0].ProductId).toBe(orderItem.ProductId)
        expect(orderResult.PurchaseOrderItems[0].Quantity).toBe(orderItem.Quantity)
        expect(orderResult.PurchaseOrderItems[0].UnitaryValue).toBe(orderItem.UnitaryValue)
        expect(orderResult.PurchaseOrderItems[0].Total).toBe(100)

        expect(orderResult.PurchaseOrderItems[1].Id).toBe(orderItem2.Id)
        expect(orderResult.PurchaseOrderItems[1].ProductId).toBe(orderItem2.ProductId)
        expect(orderResult.PurchaseOrderItems[1].Quantity).toBe(orderItem2.Quantity)
        expect(orderResult.PurchaseOrderItems[1].UnitaryValue).toBe(orderItem2.UnitaryValue)
        expect(orderResult.PurchaseOrderItems[1].Total).toBe(200)

    })

    it("insert order item data empty",()=>{
      
        const order={
            id:"123",
            supplier_id:"123",
            employee_id:"123",
        }

        const orderItem=new PurchaseOrderItem(
            "321",
            "123",
            10,
            10     
        )

        const orderItem2=new PurchaseOrderItem(
            "123",
            "321",
            10,
            20      
        )
     
        expect(()=>new PurchaseOrder(order.id,order.supplier_id,order.employee_id,[]))
        .toThrow("purchaseOrder: PurchaseOrderItems must have at least 1 item!");

    })

    it("enter order data with supplier_id and employee_id empty",()=>{
      
        const order={
            id:"123",
            supplier_id:"",
            employee_id:"",
        }

        const orderItem=new PurchaseOrderItem(
            "321",
            "123",
            10,
            10     
        )
        const orderItem2=new PurchaseOrderItem(
            "123",
            "321",
            10,
            20      
        )
     
        expect(()=>new PurchaseOrder(order.id,order.supplier_id,order.employee_id,[orderItem,orderItem2]))
        .toThrow("purchaseOrder: Invalid Supplier_id!,purchaseOrder: Invalid Employee_id")
        

    })
  


})