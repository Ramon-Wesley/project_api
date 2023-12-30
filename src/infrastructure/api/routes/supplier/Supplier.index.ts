import RouterConfig from "../config/RouterConfig";
import SupplierRouterCreate from "./create/SupplierCreate.route";
import SupplierRouterDelete from "./delete/SupplierDelete.route";
import SupplierRouterFindAll from "./findAll/SupplierFindAll.route";
import SupplierRouterFindByEmail from "./findByEmail/SupplierFindByEmail.route";
import SupplierRouterFind from "./findById/SupplierFindById.route";
import SupplierRouterUpdate from "./update/SupplierUpdateById.route";


const supplierRouterApp=RouterConfig.execute();

const supplierCreate=new SupplierRouterCreate()
const supplierFindAll=new SupplierRouterFindAll();
const supplierFindById= new SupplierRouterFind()
const supplierFindByEmail= new SupplierRouterFindByEmail()
const supplierDelete= new SupplierRouterDelete()
const supplierUpdate= new SupplierRouterUpdate()


supplierRouterApp.post("/supplier",supplierCreate.execute)
supplierRouterApp.delete(`/supplier/:id`,supplierDelete.execute)
supplierRouterApp.put(`/supplier/:id`,supplierUpdate.execute)
supplierRouterApp.post("/supplier/find/email",supplierFindByEmail.execute)
supplierRouterApp.get("/supplier/:id",supplierFindById.execute)
supplierRouterApp.get("/supplier",supplierFindAll.execute)


export default supplierRouterApp

