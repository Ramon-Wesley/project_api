import RouterConfig from "../config/RouterConfig";
import ProductRouterCreate from "./create/ProductCreate.route";

const productRouterApp=RouterConfig.execute()

const productCreate=new ProductRouterCreate();

productRouterApp.post("/product",productCreate.execute)

export default productRouterApp