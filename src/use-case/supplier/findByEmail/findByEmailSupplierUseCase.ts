import SupplierRepositoryInterface from "../../../domain/supplier/repository/SupplierRepositoryInterface";
import CacheFactory from "../../../infrastructure/cache/factory/CacheFactory";
import useCaseInterface from "../../@shared/UseCaseInterface";

import FindByEmailSupplierInDto from "./FindByEmailSupplierInDto";
import FindByEmailSupplierOutDto from "./findByEmailSupplierOutDto";


export default class FindByEmailSupplierUseCase implements useCaseInterface<FindByEmailSupplierInDto,FindByEmailSupplierOutDto>{
    private supplierRepository:SupplierRepositoryInterface;
    
    constructor(supplierRepository:SupplierRepositoryInterface){
        this.supplierRepository=supplierRepository;
    }

    async execute(input: FindByEmailSupplierInDto): Promise<FindByEmailSupplierOutDto> {
        try {
            const cache=CacheFactory.execute()
            let findResult:FindByEmailSupplierOutDto;
            const key=input.email
           
              const client=await cache.getValue(key)
              
              if(client){
                findResult=JSON.parse(client) as FindByEmailSupplierOutDto
                return findResult
                }
              
            const result=await this.supplierRepository.findByEmail(input.email);
            if(result && result.Address){
                findResult={ 
                id:result.Id,   
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
            throw error
        }
    }
    
}