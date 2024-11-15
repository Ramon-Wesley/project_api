import { RefreshToken } from "../../../domain/@shared/object-value/refreshToken/RefreshToken"
import { Roles } from "../../../domain/users/@shared/Roles"

export interface SignOutDto{
    token:string
    roles:Roles
    email:string
    refreshToken?:RefreshToken
}