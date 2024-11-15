import ObjectValue from "../ObjectValue"


export class ForgotPassword extends ObjectValue{
    constructor(
        private readonly token:string,
        private readonly expiresIn:Date,
        private readonly numberEmailIdentification:string
    ){
        super()
    }

    get Token(){
        return this.token
    }
    get ExpiresIn(){
        return this.expiresIn
    }
    get NumberEmailIdentification(){
        return this.numberEmailIdentification
    }
}