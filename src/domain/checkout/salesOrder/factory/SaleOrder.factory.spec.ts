import SaleOrderItem from "../saleOrder-item/entity/SaleOrder-item"
import SaleOrderItemFactory from "../saleOrder-item/factory/SaleOrder-item.factory";
import { SaleOrderFactory } from "./SaleOrder.factory"


describe("Test SaleOrderFactory", () => {

    it("creates a new SaleOrder",()=>
    {
        const saleOrderItems=SaleOrderItemFactory.create("1",1,100);
        const saleOrder=SaleOrderFactory.create("1","1",[saleOrderItems]);
    
        expect(saleOrder.Id).toBeDefined();
        expect(saleOrder.SaleOrderItems[0].Id).toBeDefined();
        expect(saleOrder.Supplier_id).toBe("1");
        expect(saleOrder.Employee_id).toBe("1")
        expect(saleOrder.SaleOrderItems.length).toBe(1)
        expect(saleOrder.SaleOrderItems[0].ProductId).toBe("1")
      
    }
    )
})