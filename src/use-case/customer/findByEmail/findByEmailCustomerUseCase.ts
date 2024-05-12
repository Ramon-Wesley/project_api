import useCaseInterface from "../../@shared/UseCaseInterface";

import CustomerRepositoryInterface from "../../../domain/customer/repository/CustomerRepositoryInterface";
import FindByEmailCustomerInDto from "./FindByEmailCustomerInDto";
import FindByEmailCustomerOutDto from "./findByEmailCustomerOutDto";
import CacheFactory from "../../../infrastructure/cache/factory/CacheFactory";

export default class FindByEmailCustomerUseCase implements useCaseInterface<FindByEmailCustomerInDto,FindByEmailCustomerOutDto>{
    private customerRepository:CustomerRepositoryInterface;
    
    constructor(customerRepository:CustomerRepositoryInterface){
        this.customerRepository=customerRepository;
    }

    async execute(input: FindByEmailCustomerInDto): Promise<FindByEmailCustomerOutDto> {
        try {
            const cache=CacheFactory.execute()
            let findResult:FindByEmailCustomerOutDto;
            
            let keyCache:string="customer: "+input.email;
            
            const client=await cache.getValue(keyCache)

              if(client){
                findResult=JSON.parse(client) as FindByEmailCustomerOutDto
                return findResult
                }

            const result=await this.customerRepository.findByEmail(input.email);
          
                findResult={ 
                id:result.Id,   
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
            await cache.insertValue(keyCache,JSON.stringify(findResult))

            return findResult;
        } catch (error) {
            throw error
        }
    }
    
}