import RouterConfig from "../../config/RouterConfig";
import SalesOrderRouterCreate from "./create/SalesOrderCreate.route";
import { SalesOrderDeleteRouter } from "./delete/SalesOrderRouterUpdate";
import { SalesOrderRouteFindAll } from "./findAll/SalesOrderFindAll.route";
import { SalesOrderRouterFindById } from "./findById/SalesOrderFindById.route";
import SalesOrderRouterUpdate from "./update/SalesOrderUpdate.route";

const salesOrderRouterApp=RouterConfig.execute();

const salesOrderCreate=new SalesOrderRouterCreate();
const salesOrderUpdate= new SalesOrderRouterUpdate();
const salesOrderFindById= new SalesOrderRouterFindById()
const salesOrderFindAll= new SalesOrderRouteFindAll();
const salesOrderDelete= new SalesOrderDeleteRouter();

salesOrderRouterApp.post("/sales",salesOrderCreate.execute)
salesOrderRouterApp.put("/sales/:id",salesOrderUpdate.execute)
salesOrderRouterApp.get("/sales/:id",salesOrderFindById.execute)
salesOrderRouterApp.get("/sales",salesOrderFindAll.execute)
salesOrderRouterApp.delete("/sales/:id",salesOrderDelete.execute)

export default salesOrderRouterApp   
