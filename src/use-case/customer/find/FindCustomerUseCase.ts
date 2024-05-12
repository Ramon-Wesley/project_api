import useCaseInterface from "../../@shared/UseCaseInterface";
import FindCustomerINDto from "./FindCustomerINDto";
import FindCustomerOutDto from "./FindCustomerOutDto";
import CustomerRepositoryInterface from "../../../domain/customer/repository/CustomerRepositoryInterface";
import CacheFactory from "../../../infrastructure/cache/factory/CacheFactory";

export default class FindCustomerUseCase implements useCaseInterface<FindCustomerINDto,FindCustomerOutDto>{
    private customerRepository:CustomerRepositoryInterface;
    
    constructor(customerRepository:CustomerRepositoryInterface){
        this.customerRepository=customerRepository;
    }

    async execute(input: FindCustomerINDto): Promise<FindCustomerOutDto> {
        try {
            const cache=CacheFactory.execute()
            let findResult:FindCustomerOutDto;
           
              const client=await cache.getValue(input.id)
              
              if(client){
                findResult=JSON.parse(client) as FindCustomerOutDto
                return findResult
                }
              
              const result=await this.customerRepository.findById(input.id);
       
             findResult={    
                name:result.Name,
                email:result.Email,
                cpf:result.Cpf,
                date_of_birth:result.Date_of_birth,
                isActive:result.IsActive,
                address:{
                    city:result.Address?.City,
                    uf:result.Address?.Uf,
                    description:result.Address?.Description,
                    neighborhood:result.Address?.Neighborhood,
                    number:result.Address?.Number,
                    street:result.Address?.Street,
                    zipCode:result.Address?.ZipCode
                }        
            }
            
            const stringfyResult=JSON.stringify(findResult)
            await cache.insertValue(input.id,stringfyResult)
            
            return findResult;
          }  catch (error) {
            throw error
        }
    }
    
}