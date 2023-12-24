import RouterConfig from "../config/RouterConfig";
import EmployeeRouterCreate from "./create/EmployeeCreate.route";
import EmployeeRouterDelete from "./delete/EmployeeDelete.route";
import EmployeeRouterFindAll from "./findAll/EmployeeFindAll.route";
import EmployeeRouterFindByEmail from "./findByEmail/EmployeeFindByEmail.route";
import EmployeeRouterFind from "./findById/EmployeeFindById.route";
import EmployeeRouterUpdate from "./update/EmployeeUpdateById.route";


const employeeRouterApp=RouterConfig.execute();

const employeeCreate=new EmployeeRouterCreate()
const employeeFindAll=new EmployeeRouterFindAll();
const employeeFindById= new EmployeeRouterFind()
const employeeFindByEmail= new EmployeeRouterFindByEmail()
const employeeDelete= new EmployeeRouterDelete()
const employeeUpdate= new EmployeeRouterUpdate()


employeeRouterApp.post("/employee",employeeCreate.execute)
employeeRouterApp.delete(`/employee/:id`,employeeDelete.execute)
employeeRouterApp.put(`/employee/:id`,employeeUpdate.execute)
employeeRouterApp.post("/employee/find/email",employeeFindByEmail.execute)
employeeRouterApp.get("/employee/:id",employeeFindById.execute)
employeeRouterApp.get("/employee",employeeFindAll.execute)


export default employeeRouterApp

