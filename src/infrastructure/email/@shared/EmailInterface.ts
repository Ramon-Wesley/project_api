import { MessageEmail } from "./MessageEmail";

export interface EmailInterface {
    send(message: MessageEmail): Promise<void>;
}