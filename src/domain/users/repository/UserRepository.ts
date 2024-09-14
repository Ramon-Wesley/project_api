import RepositoryInterface from "../../@shared/repository/RepositoryInterface";
import { User } from "../entity/User";

export interface UserRepositoryInterface extends RepositoryInterface<User>{
    findByEmail(email:string):Promise<User>

}