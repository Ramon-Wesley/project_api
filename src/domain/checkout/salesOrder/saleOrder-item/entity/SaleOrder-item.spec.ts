import SaleOrderItem from "./SaleOrder-item";

describe("test the sale order item entity",()=>{
    it("correctly enter order data",()=>{
        const orderItem={
            id:"123",
            saleOrder_id:"123",
            product_id:"123",
            quantity:10,
            unitaryValue:10     
        }
       const orderItemResult=new SaleOrderItem(orderItem.id,orderItem.saleOrder_id,orderItem.product_id,orderItem.quantity,orderItem.unitaryValue);
       
       expect(orderItemResult.Id).toBe(orderItem.id)
       expect(orderItemResult.SaleOrderId).toBe(orderItem.saleOrder_id);
       expect(orderItemResult.ProductId).toBe(orderItem.product_id)
       expect(orderItemResult.Quantity).toBe(orderItem.quantity)
       expect(orderItemResult.UnitaryValue).toBe(orderItem.unitaryValue)
       expect(orderItemResult.Total).toBe(100)
    })

    it("negative values enter order data",()=>{
        const orderItem={
            id:"123",
            saleOrder_id:"123",
            product_id:"123",
            quantity:-10,
            unitaryValue:-10     
        }
       expect(()=>new SaleOrderItem(orderItem.id,orderItem.saleOrder_id,orderItem.product_id,orderItem.quantity,orderItem.unitaryValue))
       .toThrow("saleOrder-item: Number must be greater than or equal to 0,saleOrder-item: Number must be greater than or equal to 0");
       
       
    })
    it("insert invalid quantity  ​​when modifying order item",()=>{
        const orderItem={
            id:"123",
            saleOrder_id:"123",
            product_id:"123",
            quantity:10,
            unitaryValue:10     
        }
        const resultOrderItem=new SaleOrderItem(orderItem.id,orderItem.saleOrder_id,orderItem.product_id,orderItem.quantity,orderItem.unitaryValue);
       expect(()=>resultOrderItem.changeQuantity(-10))
       .toThrow("saleOrder-item: Number must be greater than or equal to 0");
       
       
    })


})