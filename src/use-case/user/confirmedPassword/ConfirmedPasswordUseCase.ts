import { UserRepositoryInterface } from "../../../domain/users/repository/UserRepository";
import { TokenFactory } from "../../../infrastructure/providers/tokens/factory/TokenFactory";
import useCaseInterface from "../../@shared/UseCaseInterface";
import { ConfirmedPasswordInDto } from "./ConfirmedPasswordInDto";

export class ConfirmedPasswordUseCase implements useCaseInterface<ConfirmedPasswordInDto, void> {
    constructor(
        private readonly userRepository: UserRepositoryInterface
    ) {
            
        }

    async execute(input: ConfirmedPasswordInDto): Promise<void> {
        const confirmedPassword = await this.userRepository.findByEmail(input.email)
        const now=new Date()
        if(!confirmedPassword) {
            throw new Error("Token expired");
        }
    }
}