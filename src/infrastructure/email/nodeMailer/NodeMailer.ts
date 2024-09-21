import SMTPTransport from "nodemailer/lib/smtp-transport";
import { QueueFactory } from "../../queue/factory/QueueFactory";
import { EmailInterface } from "../@shared/EmailInterface";
import { MessageEmail } from "../@shared/MessageEmail";
import { createTransport, Transporter } from "nodemailer";


export class NodeMailer implements EmailInterface {
    private transporter: Transporter<SMTPTransport.SentMessageInfo>;

    constructor() {
        this.transporter = createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            auth: {
              user: process.env.MAIL_USER ,
              pass: process.env.MAIL_PASSWORD,
            },
        });
    }

    async send(message: MessageEmail): Promise<void> {
        try {
            await QueueFactory.execute().produce("recuperar_senha","send",5000,message);
            await QueueFactory.execute().consume("recuperar_senha", async (job) => {
                console.log(`Processando job ${job.id}...`);
                const messageData = job.data;
                const message = new MessageEmail(
                    messageData.from,
                    messageData.to,
                    messageData.subject,
                    messageData.text,
                    messageData.html
                );
                await this.sendExecute(message); 
            });
            
        } catch (error) {
            
            throw new Error("Method not implemented.");
        }
    }
    
    
    
    private async sendExecute(message: MessageEmail): Promise<void> {
        
        await this.transporter.sendMail({
            from: process.env.MAIL_FROM || "app-mail",
            to: message.getTo(),
            subject: message.getSubject(),
            text: message.getText(),
            html: message.getHtml(),
        })
    }
}