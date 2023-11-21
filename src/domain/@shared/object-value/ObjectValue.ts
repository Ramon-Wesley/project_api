import Notification from "../notification/Notification";

export default abstract class ObjectValue{
    protected notification:Notification;

    constructor(){
        this.notification=new Notification()
    }

    getNotification(){
        return this.notification;
    }
}