import CustomerRepositoryInterface from "../../../domain/customer/repository/CustomerRepositoryInterface";
import useCaseInterface from "../../@shared/UseCaseInterface";
import DeleteCustomerInDto from "./DeleteCustomerInDto";

export default class DeleteCustomerUseCase implements useCaseInterface<DeleteCustomerInDto,void>{
    private customerRepository:CustomerRepositoryInterface;

    constructor(customerRepository:CustomerRepositoryInterface){
        this.customerRepository=customerRepository;
    }
    
   async execute(input: DeleteCustomerInDto): Promise<void> {
        try {
            await this.customerRepository.findById(input.id)
            
            await this.customerRepository.deleteById(input.id);
           
        } catch (error) {
            throw error  
        }
    }

}