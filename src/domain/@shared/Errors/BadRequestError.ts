export default class DatabaseInterface extends Error{

    constructor(error:string){
        super(error)
        this.name="DatabaseError"
    }
}