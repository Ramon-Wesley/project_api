import RouterConfig from "../../config/RouterConfig";
import purchaseOrderRouterCreate from "./create/PurchaseOrderCreate.route";
import { PurchaseOrderDeleteRouter } from "./delete/PurchaseOrderRouterUpdate";
import { PurchaseOrderRouteFindAll } from "./findAll/PurchaseOrderFindAll.route";
import { PurchaseOrderRouterFindById } from "./findById/PurchaseOrderFindById.route";
import purchaseOrderRouterUpdate from "./update/PurchaseOrderUpdate.route";

const purchaseOrderRouterApp=RouterConfig.execute();

const purchaseOrderCreate=new purchaseOrderRouterCreate();
const purchaseOrderUpdate= new purchaseOrderRouterUpdate();
const purchaseOrderFindById= new PurchaseOrderRouterFindById()
const purchaseOrderFindAll= new PurchaseOrderRouteFindAll();
const purchaseOrderDelete= new PurchaseOrderDeleteRouter();

purchaseOrderRouterApp.post("/purchase",purchaseOrderCreate.execute)
purchaseOrderRouterApp.put("/purchase/:id",purchaseOrderUpdate.execute)
purchaseOrderRouterApp.get("/purchase/:id",purchaseOrderFindById.execute)
purchaseOrderRouterApp.get("/purchase",purchaseOrderFindAll.execute)
purchaseOrderRouterApp.delete("/purchase/:id",purchaseOrderDelete.execute)

export default purchaseOrderRouterApp   
