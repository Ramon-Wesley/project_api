import useCaseInterface from "../../@shared/UseCaseInterface";
import FindCustomerINDto from "./FindCustomerINDto";
import FindCustomerOutDto from "./FindCustomerOutDto";
import CustomerRepositoryInterface from "../../../domain/customer/repository/CustomerRepositoryInterface";

export default class FindCustomerUseCase implements useCaseInterface<FindCustomerINDto,FindCustomerOutDto>{
    private customerRepository:CustomerRepositoryInterface;
    
    constructor(customerRepository:CustomerRepositoryInterface){
        this.customerRepository=customerRepository;
    }

    async execute(input: FindCustomerINDto): Promise<FindCustomerOutDto> {
        try {
            const result=await this.customerRepository.findById(input.id);
            if(result && result.Address){
                const findResult:FindCustomerOutDto={    
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