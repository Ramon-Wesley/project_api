import Notification from "../notification/Notification";
export default class Entity{
    protected id:string;
    protected notification:Notification;

    constructor(id:string){
        this.notification=new Notification()
        this.id=id
    }
   getNotification():Notification{
    return this.notification
   }
    
}