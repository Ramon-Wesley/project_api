import RouterConfig from "../../../config/RouterConfig";
import CategoryRouterCreate from "./create/CategoryCreate.route";
import CategoryRouterDelete from "./delete/CategoryDelete.route";
import CategoryRouterFindAll from "./findAll/CategoryFindAll.route";
import CategoryRouterFind from "./findById/CategoryFindById.route";
import CategoryRouterUpdate from "./update/CategoryCreate.route";


const categoryRouterApp=RouterConfig.execute();

const categoryCreate=new CategoryRouterCreate();
const categoryFindAll= new CategoryRouterFindAll();
const categoryDelete= new CategoryRouterDelete();
const categoryFind= new CategoryRouterFind();
const categoryUpdate= new CategoryRouterUpdate()


categoryRouterApp.post("/category",categoryCreate.execute)
categoryRouterApp.get("/category",categoryFindAll.execute)
categoryRouterApp.get("/category/:id",categoryFind.execute)
categoryRouterApp.delete("/category/:id",categoryDelete.execute)
categoryRouterApp.put("/category/:id",categoryUpdate.execute)

export default categoryRouterApp;