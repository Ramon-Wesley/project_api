import { UserFactory } from "../../../domain/users/factory/UserFactory";
import { UserRepositoryInterface } from "../../../domain/users/repository/UserRepository";
import { EncryptFactory } from "../../../infrastructure/providers/encripty/factory/EncryptFactory";
import useCaseInterface from "../../@shared/UseCaseInterface";
import CreateUserInDto from "./CreateUserInDto";

export default class CreateUserUseCase implements useCaseInterface<CreateUserInDto,void>{
    private userRepository:UserRepositoryInterface;

    constructor(userRepository:UserRepositoryInterface){
        this.userRepository=userRepository;
    }

    async execute(input: CreateUserInDto): Promise<void> {
        try {
            const user=UserFactory.create(input.name,input.email,input.password)
            const encripty=await EncryptFactory.create().encrypt(user.Password)
            user.changePassword(encripty)
            await this.userRepository.create(user)
        } catch (error) {
            throw new Error(error as string)
        }
    }


}