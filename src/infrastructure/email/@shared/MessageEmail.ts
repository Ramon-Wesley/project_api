import { MessagesQueue } from "../../queue/@shared/MessagesQueue";

export class MessageEmail extends MessagesQueue {
private from : string;
private to : string;
private subject : string;
private text : string;
private html : string;
constructor(from:string,to:string,subject:string,text:string,html:string) {
    super("email");
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.text = text;
    this.html = html;
}
validate() {
}

getFrom(): string {
    return this.from;
}


getTo(): string {
    return this.to;
}

getSubject(): string {
    return this.subject;
}

getText(): string {
    return this.text;
}

getHtml(): string {
    return this.html;
}

}
    