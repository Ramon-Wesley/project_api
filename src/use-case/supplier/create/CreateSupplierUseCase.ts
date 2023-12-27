import Address from "../../../domain/@shared/object-value/address/Address";
import SupplierFactory from "../../../domain/supplier/factory/SupplierFactory";
import SupplierRepositoryInterface from "../../../domain/supplier/repository/SupplierRepositoryInterface";

import useCaseInterface from "../../@shared/UseCaseInterface";
import CreateSupplierInDto from "./CreateSupplierInDto";

export default class CreateSupplierUseCase implements useCaseInterface<CreateSupplierInDto,void>{
    private supplierRepository:SupplierRepositoryInterface;

    constructor(supplierRepository:SupplierRepositoryInterface){
        this.supplierRepository=supplierRepository;
    }

    async execute(input: CreateSupplierInDto): Promise<void> {
        try {
            const supplier=SupplierFactory.create(input.name,input.cnpj,input.email,input.date_of_birth)
            if(input.address){
                const address= new Address(input.address.uf,input.address.city,input.address.neighborhood,input.address.zipCode,
                    input.address.street,input.address.number,input.address.description)
                    supplier.changeAddress(address)
            } 
            await this.supplierRepository.create(supplier)   
        } catch (error) {
            const err=error as Error
            throw new Error(error as string)
        }
    }

}