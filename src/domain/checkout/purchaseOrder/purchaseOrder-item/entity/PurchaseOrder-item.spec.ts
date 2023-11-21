import PurchaseOrderItem from "./PurchaseOrder-item";

describe("test the purchase order item entity",()=>{
    it("correctly enter order data",()=>{
        const orderItem={
            id:"123",
            purchaseOrder_id:"123",
            product_id:"123",
            quantity:10,
            unitaryValue:10     
        }
       const orderItemResult=new PurchaseOrderItem(orderItem.id,orderItem.purchaseOrder_id,orderItem.product_id,orderItem.quantity,orderItem.unitaryValue);
       
       expect(orderItemResult.Id).toBe(orderItem.id)
       expect(orderItemResult.PurchaseOrderId).toBe(orderItem.purchaseOrder_id);
       expect(orderItemResult.ProductId).toBe(orderItem.product_id)
       expect(orderItemResult.Quantity).toBe(orderItem.quantity)
       expect(orderItemResult.UnitaryValue).toBe(orderItem.unitaryValue)
       expect(orderItemResult.Total).toBe(100)
    })

    it("negative values enter order data",()=>{
        const orderItem={
            id:"123",
            purchaseOrder_id:"123",
            product_id:"123",
            quantity:-10,
            unitaryValue:-10     
        }
       expect(()=>new PurchaseOrderItem(orderItem.id,orderItem.purchaseOrder_id,orderItem.product_id,orderItem.quantity,orderItem.unitaryValue))
       .toThrow("purchaseOrder-item: Number must be greater than or equal to 0,purchaseOrder-item: Number must be greater than or equal to 0");
       
       
    })
    it("insert invalid quantity  ​​when modifying order item",()=>{
        const orderItem={
            id:"123",
            purchaseOrder_id:"123",
            product_id:"123",
            quantity:10,
            unitaryValue:10     
        }
        const resultOrderItem=new PurchaseOrderItem(orderItem.id,orderItem.purchaseOrder_id,orderItem.product_id,orderItem.quantity,orderItem.unitaryValue);
       expect(()=>resultOrderItem.changeQuantity(-10))
       .toThrow("purchaseOrder-item: Number must be greater than or equal to 0");
       
       
    })


})