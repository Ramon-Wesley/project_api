import SupplierRepositoryInterface from "../../../domain/supplier/repository/SupplierRepositoryInterface";
import CacheFactory from "../../../infrastructure/cache/factory/CacheFactory";
import useCaseInterface from "../../@shared/UseCaseInterface";
import FindSupplierINDto from "./FindSupplierInDto";
import FindSupplierOutDto from "./FindSupplierOutDto";


export default class FindSupplierUseCase implements useCaseInterface<FindSupplierINDto,FindSupplierOutDto>{
    private supplierRepository:SupplierRepositoryInterface;
    
    constructor(supplierRepository:SupplierRepositoryInterface){
        this.supplierRepository=supplierRepository;
    }

    async execute(input: FindSupplierINDto): Promise<FindSupplierOutDto> {
        try {
            const cache=CacheFactory.execute()
            let findResult:FindSupplierOutDto;
            const key=input.id
           
              const client=await cache.getValue(key)
              
              if(client){
                findResult=JSON.parse(client) as FindSupplierOutDto
                return findResult
                }
              
            const result=await this.supplierRepository.findById(input.id);
            if(result && result.Address){
                findResult={    
                name:result.Name,
                email:result.Email,
                cnpj:result.Cnpj,
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
            await cache.insertValue(key,JSON.stringify(findResult))
            return findResult;
            }
            throw new Error("supplier not found!")
        } catch (error) {
            const err=error as Error;
            throw new Error(err.message);
        }
    }
    
}