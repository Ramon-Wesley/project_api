import useCaseInterface from "../../@shared/UseCaseInterface";

import CustomerRepositoryInterface from "../../../domain/customer/repository/CustomerRepositoryInterface";
import FindByEmailCustomerInDto from "./FindByEmailCustomerInDto";
import FindByEmailCustomerOutDto from "./findByEmailCustomerOutDto";

export default class FindByEmailCustomerUseCase implements useCaseInterface<FindByEmailCustomerInDto,FindByEmailCustomerOutDto>{
    private customerRepository:CustomerRepositoryInterface;
    
    constructor(customerRepository:CustomerRepositoryInterface){
        this.customerRepository=customerRepository;
    }

    async execute(input: FindByEmailCustomerInDto): Promise<FindByEmailCustomerOutDto> {
        try {
            const result=await this.customerRepository.findByEmail(input.email);
            if(result && result.Address){
                const findResult:FindByEmailCustomerOutDto={ 
                id:result.Id,   
                name:result.Name,
                email:result.Email,
                cpf:result.Cpf,
                date_of_birth:result.Date_of_birth,
                isActive:result.IsActive,
                address:{
                    city:result.Address.City,
                    uf:result.Address?.Uf,
                    description:result.Address?.Description,
                    neighborhood:result.Address?.Neighborhood,
                    number:result.Address?.Number,
                    street:result.Address?.Street,
                    zipCode:result.Address?.ZipCode
                }
                
            }
            return findResult;
            }
            throw new Error("customer not found!")
        } catch (error) {
            const err=error as Error;
            throw new Error(err.message);
        }
    }
    
}