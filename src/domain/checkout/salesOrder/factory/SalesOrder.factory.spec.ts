import SalesOrderItem from "../salesOrder-item/entity/SalesOrder-item"
import SalesOrderItemFactory from "../salesOrder-item/factory/SalesOrder-item.factory";
import { SalesOrderFactory } from "./SalesOrder.factory"


describe("Test SalesOrderFactory", () => {

    it("creates a new SalesOrder",()=>
    {
        const salesOrderItems=SalesOrderItemFactory.create("1",1,100);
        const salesOrder=SalesOrderFactory.create("1","1",[salesOrderItems]);
    
        expect(salesOrder.Id).toBeDefined();
        expect(salesOrder.SalesOrderItems[0].Id).toBeDefined();
        expect(salesOrder.Customer_id).toBe("1");
        expect(salesOrder.Employee_id).toBe("1")
        expect(salesOrder.SalesOrderItems.length).toBe(1)
        expect(salesOrder.SalesOrderItems[0].ProductId).toBe("1")
      
    }
    )
})