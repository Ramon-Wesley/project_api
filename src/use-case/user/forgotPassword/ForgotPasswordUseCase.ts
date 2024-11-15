import { UserRepositoryInterface } from "../../../domain/users/repository/UserRepository"
import { MessageEmail } from "../../../infrastructure/email/@shared/MessageEmail"
import { EmailFactory } from "../../../infrastructure/email/factory/EmailFactory"
import { templateForgotPassword } from "../../../infrastructure/email/templates/ForgotPasswordTemplate"
import { TokenFactory } from "../../../infrastructure/providers/tokens/factory/TokenFactory"
import useCaseInterface from "../../@shared/UseCaseInterface"
import { ForgotPasswordInDto } from "./ForgotPasswordInDto"
import { ForgotPasswordOutDto } from "./ForgotPasswordOutDto"

export class ForgotPasswordUseCase implements useCaseInterface<ForgotPasswordInDto,ForgotPasswordOutDto>{
    private userRepository: UserRepositoryInterface
    constructor(userRepository: UserRepositoryInterface){
        this.userRepository = userRepository
    }
    async execute(input: ForgotPasswordInDto): Promise<ForgotPasswordOutDto> {
        try {
            const email=await this.userRepository.findByEmail(input.email)

            if(email){
                const numberEmailIdentification=String(Math.floor(Math.random() * 1000000))
                const token=  TokenFactory.create().generatedToken("1h",email.Email)

                const response:ForgotPasswordOutDto={
                    token:token,
                    numberEmailIdentification:numberEmailIdentification 
                }
                console.log(TokenFactory.create().verifyToken(token).sub)
               // const messageTemplate=templateForgotPassword(numberEmailIdentification)
               // const message:MessageEmail=new MessageEmail("",email.Email,"Recuperar Senha","",messageTemplate)
                //EmailFactory.create().send(message)
                return  response
            }
          
            throw new Error("email not found")
        } catch (error) {
            
            throw new Error(error as string)
        }
    }

    }