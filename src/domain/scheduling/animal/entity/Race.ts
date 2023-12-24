import Entity from "../../../@shared/entity/Entity";
import NotificationError from "../../../@shared/notification/NotificationError";
import RaceFactoryValidation from "../factory/Race.factory.validate";


export default class Race extends Entity{

    private name:string;

    constructor(id:string,name:string){
     super(id)
     this.name=name;
     this.validate()
    }

    private validate(){
        RaceFactoryValidation.create().validate(this)

        if(this.getNotification().hasErrors()){
            throw new NotificationError(this.getNotification().getErrors())
        }
    }

    get Name(){
        return this.name
    }

    get Id(){
        return this.id
    }

    changeName(name:string){
        this.name=name
        this.validate();
    }
}