import { NodeMailer } from "../nodeMailer/NodeMailer";

export class EmailFactory {
    static create() {
        switch(process.env.MAIL_TYPE){
            case "nodemailer":
                return new NodeMailer();
            default:
                return new NodeMailer();
        }
    }
}