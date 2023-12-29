import RouterConfig from "../../../config/RouterConfig";
import CategoryRouterCreate from "./create/CustomerCreate.route";
import CategoryRouterFindAll from "./findAll/CategoryFindAll.route";


const categoryRouterApp=RouterConfig.execute();

const categoryCreate=new CategoryRouterCreate();
const categoryFindAll= new CategoryRouterFindAll()


categoryRouterApp.post("/category",categoryCreate.execute)
categoryRouterApp.get("/category",categoryFindAll.execute)


export default categoryRouterApp;