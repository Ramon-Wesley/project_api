import RouterConfig from "../config/RouterConfig";
import CustomerRouterCreate from "./create/CustomerCreate.route";
import CustomerRouterFindAll from "./findAll/CustomerFindAll.route";
import CustomerRouterDelete from "./delete/CustomerDelete.route";
import CustomerRouterFindByEmail from "./findByEmail/CustomerFindByEmail.route";
import CustomerRouterFind from "./findById/CustomerFindById.route";
import CustomerRouterUpdate from "./update/CustomerUpdateById.route";

const customerRouterApp=RouterConfig.execute();

const customerCreate=new CustomerRouterCreate();
const customerFindAll=new CustomerRouterFindAll();
const customerFindById= new CustomerRouterFind()
const customerFindByEmail= new CustomerRouterFindByEmail()
const customerDelete= new CustomerRouterDelete()
const customerUpdate= new CustomerRouterUpdate()

customerRouterApp.post("/customer",customerCreate.execute)
customerRouterApp.delete(`/customer/:id`,customerDelete.execute)
customerRouterApp.put(`/customer/:id`,customerUpdate.execute)
customerRouterApp.post("/customer/find/email",customerFindByEmail.execute)
customerRouterApp.get("/customer/:id",customerFindById.execute)
customerRouterApp.get("/customer",customerFindAll.execute)

export default customerRouterApp;