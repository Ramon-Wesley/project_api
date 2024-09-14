import { EncryptInterface } from "../@shared/EncryptInterface";
import { Bcrypt } from "../bcrypt/Bcrypt";

export class EncryptFactory{

    static create():EncryptInterface{
       switch (process.env.ENCRYPT) {
        case "bcrypt":
            return new Bcrypt();
        default:
            return new Bcrypt();
       }
    }
}