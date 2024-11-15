import PurchaseOrderItem from "../purchaseOrder-item/entity/PurchaseOrder-item"
import PurchaseOrderItemFactory from "../purchaseOrder-item/factory/PurchaseOrder-item.factory"
import { PurchaseOrderFactory } from "./PurchaseOrder.factory"


describe("Test PurchaseOrderFactory", () => {

    it("creates a new PurchaseOrder",()=>
    {
        const purchaseOrderItems=PurchaseOrderItemFactory.create("1",1,100);
        const purchaseOrder=PurchaseOrderFactory.create("1","1",[purchaseOrderItems]);
    
        expect(purchaseOrder.Id).toBeDefined();
        expect(purchaseOrder.PurchaseOrderItems[0].Id).toBeDefined();
        expect(purchaseOrder.Supplier_id).toBe("1");
        expect(purchaseOrder.Employee_id).toBe("1")
        expect(purchaseOrder.PurchaseOrderItems.length).toBe(1)
        expect(purchaseOrder.PurchaseOrderItems[0].ProductId).toBe("1")
      
    }
    )
})