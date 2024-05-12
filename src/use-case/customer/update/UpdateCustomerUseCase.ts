import Address from "../../../domain/@shared/object-value/address/Address";
import Customer from "../../../domain/customer/entity/Customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/CustomerRepositoryInterface";
import useCaseInterface from "../../@shared/UseCaseInterface";
import UpdateCustomerInDto from "./UpdateCustomerInDto";


export default class UpdateCustomerUseCase implements useCaseInterface<UpdateCustomerInDto,void>{
    private customerRepository:CustomerRepositoryInterface;
    
    constructor(customerRepository:CustomerRepositoryInterface){
        this.customerRepository=customerRepository;
    }
    async execute(input: UpdateCustomerInDto): Promise<void> {
        try {

            const customer=await this.customerRepository.findById(input.id)
        
            if(customer){
            customer.changeName(input.name)
            customer.changeCPF(input.cpf)
            customer.changeDate_of_birth(input.date_of_birth)
            customer.changeEmail(input.email)
            const address= new Address(input.address.uf,input.address.city,input.address.neighborhood,
            input.address.zipCode,input.address.street,input.address.number,input.address.description)
            customer.changeAddress(address)  
            await this.customerRepository.updateById(input.id,customer);
        }

        } catch (error) {
            throw error as Error
        }
    }


}