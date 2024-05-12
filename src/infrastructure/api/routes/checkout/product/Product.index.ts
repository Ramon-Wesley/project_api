import RouterConfig from "../../config/RouterConfig";
import ProductRouterCreate from "./create/ProductCreate.route";
import ProductRouterDelete from "./delete/ProductDelete.route";
import ProductRouterFindAll from "./findAll/ProductFindAll.route";
import ProductRouterFind from "./findById/ProductFindById.route";
import ProductRouterUpdate from "./update/ProductUpdate.route";



const productRouterApp=RouterConfig.execute();

const productCreate=new ProductRouterCreate();
const productDelete= new ProductRouterDelete();
const productFindAll= new ProductRouterFindAll();
const productFind= new ProductRouterFind()
const productUpdate= new ProductRouterUpdate()


productRouterApp.post("/product",productCreate.execute)
productRouterApp.get("/product",productFindAll.execute)
productRouterApp.get("/product/:id",productFind.execute)
productRouterApp.delete("/product/:id",productDelete.execute)
productRouterApp.put("/product/:id",productUpdate.execute)

export default productRouterApp;