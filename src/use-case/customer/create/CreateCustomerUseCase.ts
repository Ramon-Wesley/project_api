import NotificationError from "../../../domain/@shared/notification/NotificationError";
import Address from "../../../domain/@shared/object-value/address/Address";
import CustomerFactory from "../../../domain/customer/factory/CustomerFactory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/CustomerRepositoryInterface";
import CustomerRepositorySequelize from "../../../infrastructure/db/sequelize/customer/repository/CustomerRepositorySequelize";
import useCaseInterface from "../../@shared/UseCaseInterface";
import CreateCustomerInDto from "./CreateCustomerInDto";

export default class CreateCustomerUseCase implements useCaseInterface<CreateCustomerInDto,void>{
    private customerRepository:CustomerRepositoryInterface;

    constructor(customerRepository:CustomerRepositoryInterface){
        this.customerRepository=customerRepository;
    }

    async execute(input: CreateCustomerInDto): Promise<void> {
        try {
            const customer=CustomerFactory.create(input.name,input.cpf,input.email,input.date_of_birth)
            if(input.address){
                const address= new Address(input.address.uf,input.address.city,input.address.neighborhood,input.address.zipCode,
                    input.address.street,input.address.number,input.address.description)
                    customer.changeAddress(address)
            } 
            await this.customerRepository.create(customer)   
        } catch (error) {
            throw error
        }
    }

}