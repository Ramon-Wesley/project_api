import Address from "../../../domain/@shared/object-value/address/Address";
import Supplier from "../../../domain/supplier/entity/Supplier";
import SupplierRepositoryInterface from "../../../domain/supplier/repository/SupplierRepositoryInterface";

import useCaseInterface from "../../@shared/UseCaseInterface";
import UpdateSupplierInDto from "./UpdateSupplierINDto";



export default class UpdateSupplierUseCase implements useCaseInterface<UpdateSupplierInDto,void>{
    private supplierRepository:SupplierRepositoryInterface;
    
    constructor(supplierRepository:SupplierRepositoryInterface){
        this.supplierRepository=supplierRepository;
    }
    async execute(input: UpdateSupplierInDto): Promise<void> {
        try {
            const supplier=new Supplier(input.id,input.name,input.cnpj,input.email,input.date_of_birth)
            if(input.address){
                const address= new Address(input.address.uf,input.address.city,input.address.neighborhood,input.address.zipCode,
                    input.address.street,input.address.number,input.address.description)
                    supplier.changeAddress(address)
            } 
            await this.supplierRepository.updateById(input.id,supplier);
        } catch (error) {
            throw error
        }
    }


}