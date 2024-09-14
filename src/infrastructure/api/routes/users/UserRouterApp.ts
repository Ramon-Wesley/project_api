import EnsureAuthenticated from "../../../middleware/ensureAuthentication/EnsureAuthenticated";
import RouterConfig from "../config/RouterConfig";
import { UserRouterCreate } from "./create/UserRouterCreate";
import { RefreshTokenUserRouter } from "./refreshToken/RefreshTokenUserRouter";
import { UserSignInRouter } from "./signIn/UserSignInRouter";

const userRouterApp=RouterConfig.execute();
const userRouterCreate=new UserRouterCreate()
const userRouterSignIn=new UserSignInRouter()
const refreshTokenUser= new RefreshTokenUserRouter()
userRouterApp.post("/user", userRouterCreate.execute)
userRouterApp.post("/user/signin",userRouterSignIn.execute)
userRouterApp.post("/refresh_token",refreshTokenUser.execute)
export default userRouterApp