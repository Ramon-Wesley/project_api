import Entity from "../../@shared/entity/Entity";
import NotificationError from "../../@shared/notification/NotificationError";
import { RefreshToken } from "../../refreshToken/entity/RefreshToken";
import { Roles } from "../@shared/Roles";
import UserFactoryValidator from "../factory/UserFactoryValidator";

export class User extends Entity {
    private name: string;
    private email: string;
    private password: string;
    private isActive: boolean;
    private roles:Roles;
    private refreshToken?:RefreshToken
    constructor(
         id: string,
         name: string,
         email: string,
         password: string,
         refreshToken?:RefreshToken
    ) {
        super(id)
        this.name = name
        this.email = email
        this.password = password
        this.isActive = true
        this.roles=Roles.EMPLOYEE
        this.refreshToken=refreshToken
        this.validate()
    }

    validate() {
        UserFactoryValidator
            .create()
            .validate(this)
        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors())
        }
    }

    changeRefreshToken(refreshToken:RefreshToken){
        this.refreshToken=refreshToken
    }
    changeRoleToAdmin() {
        this.roles = Roles.ADMIN
    }

    changeRoleToEmployee() {
        this.roles = Roles.EMPLOYEE
    }
    changeRole(role: Roles) {
        this.roles = role
    }

    changeName(name: string) {
        this.name = name
        this.validate()
    }

    changeEmail(email: string) {
        this.email = email
        this.validate()
    }

    changePassword(password: string) {
        this.password = password
        this.validate()
    }

    disable() {
        this.isActive = false
    }

    activate() {
        this.isActive = true
    }
    changeIsActive(isActive: boolean) {
        this.isActive = isActive
    }

    get Id() {
        return this.id
    }

    get RefreshToken() {
        return this.refreshToken
    }
    
    get Name() {
        return this.name
    }

    get Email() {
        return this.email
    }

    get Password() {
        return this.password
    }

    get IsActive() {
        return this.isActive
    }

    get Roles() {
        return this.roles
    }
    
}