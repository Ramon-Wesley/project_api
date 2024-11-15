import SalesOrderItem from "./SalesOrder-item";

describe("test the sales order item entity",()=>{
    it("correctly enter order data",()=>{
        const orderItem={
            id:"123",
            product_id:"123",
            quantity:10,
            unitaryValue:10     
        }
       const orderItemResult=new SalesOrderItem(orderItem.id,orderItem.product_id,orderItem.quantity,orderItem.unitaryValue);
       
       expect(orderItemResult.Id).toBe(orderItem.id)
       expect(orderItemResult.ProductId).toBe(orderItem.product_id)
       expect(orderItemResult.Quantity).toBe(orderItem.quantity)
       expect(orderItemResult.UnitaryValue).toBe(orderItem.unitaryValue)
       expect(orderItemResult.Total).toBe(100)
    })

    it("negative values enter order data",()=>{
        const orderItem={
            id:"123",
            product_id:"123",
            quantity:-10,
            unitaryValue:-10     
        }
       expect(()=>new SalesOrderItem(orderItem.id,orderItem.product_id,orderItem.quantity,orderItem.unitaryValue))
       .toThrow("salesOrder-item: salesOrderItems must have at least 1 item!,salesOrder-item: The unit value must not be less than zero!");
       
       
    })
    it("insert invalid quantity  ​​when modifying order item",()=>{
        const orderItem={
            id:"123",
            product_id:"123",
            quantity:10,
            unitaryValue:10     
        }
        const resultOrderItem=new SalesOrderItem(orderItem.id,orderItem.product_id,orderItem.quantity,orderItem.unitaryValue);
       expect(()=>resultOrderItem.changeQuantity(-10))
       .toThrow("salesOrder-item: salesOrderItems must have at least 1 item!");
       
       
    })


})