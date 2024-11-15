import { CONSTRAINT } from "sqlite3";
import { UserRepositoryInterface } from "../../../domain/users/repository/UserRepository";
import { EncryptFactory } from "../../../infrastructure/providers/encripty/factory/EncryptFactory";
import useCaseInterface from "../../@shared/UseCaseInterface";
import { SignInDto } from "./SignInDto";
import { SignOutDto } from "./SignOutDto";
import { TokenFactory } from "../../../infrastructure/providers/tokens/factory/TokenFactory";

export class SignInUseCase implements useCaseInterface<SignInDto,SignOutDto>{
    private userRepository:UserRepositoryInterface;

    constructor(userRepository:UserRepositoryInterface){
        this.userRepository=userRepository;
    }
    async execute(input: SignInDto): Promise<SignOutDto> {
        try {
            const user=await this.userRepository.findByEmail(input.email)
            const passMatch=await EncryptFactory.create().compare(input.password,user.Password)
            if(passMatch){
                const token=  TokenFactory.create().generatedToken(process.env.JWT_EXPIRESIN as string,user.Email)

                const generatedRefreshToken=TokenFactory.create()
  
                const refreshToken=await generatedRefreshToken.verifyToken(user.Id)
                const response:SignOutDto={
                    token:token,
                    roles:user.Roles,
                    email:user.Email,
                    refreshToken:refreshToken
                }
                console.log(response)
                return response
            }
            throw new Error("invalid credentials")
        } catch (error) {
            throw new Error(error as string)
        }
    }

}
