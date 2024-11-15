import EnsureAuthenticated from "../../../middleware/ensureAuthentication/EnsureAuthenticated";
import RouterConfig from "../config/RouterConfig";
import { UserRouterCreate } from "./create/UserRouterCreate";
import { ForgotPasswordRouter } from "./forgotPassword/ForgotPasswordRouter";
import { RefreshTokenUserRouter } from "./refreshToken/RefreshTokenUserRouter";
import { UserSignInRouter } from "./signIn/UserSignInRouter";

const userRouterApp=RouterConfig.execute();
const userRouterCreate=new UserRouterCreate()
const userRouterSignIn=new UserSignInRouter()
const refreshTokenUser= new RefreshTokenUserRouter()
const forgotPasswordUser= new ForgotPasswordRouter()
userRouterApp.post("/user", userRouterCreate.execute)
userRouterApp.post("/user/signin",userRouterSignIn.execute)
userRouterApp.post("/refresh_token",refreshTokenUser.execute)
userRouterApp.post("/forgot_password",forgotPasswordUser.execute)
export default userRouterApp