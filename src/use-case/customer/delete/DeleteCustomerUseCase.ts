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
            const findCustomer=await this.customerRepository.findById(input.id)
            if(findCustomer){
                await this.customerRepository.deleteById(input.id);
            }else{
                throw new Error("Customer not found!");
            }
        } catch (error) {
            const err=error as Error;
            throw new Error(err.message);    
        }
    }

}