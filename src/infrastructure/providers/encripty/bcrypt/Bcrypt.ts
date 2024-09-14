import { EncryptInterface } from "../@shared/EncryptInterface";
import bcrypt from "bcrypt"

export class Bcrypt implements EncryptInterface{

    async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password,hash)
    }
    async encrypt(password:string):Promise<string>{
        const salt=await bcrypt.genSalt(8);
        const hash=await bcrypt.hash(password,salt);
        return hash
    }

}