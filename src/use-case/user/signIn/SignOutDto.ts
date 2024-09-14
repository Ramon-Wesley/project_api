import { RefreshToken } from "../../../domain/refreshToken/entity/RefreshToken"
import { Roles } from "../../../domain/users/@shared/Roles"

export interface SignOutDto{
    token:string
    roles:Roles
    email:string
    refreshToken?:RefreshToken
}