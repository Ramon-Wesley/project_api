

import SupplierRepositoryInterface from "../../../domain/supplier/repository/SupplierRepositoryInterface";
import useCaseInterface from "../../@shared/UseCaseInterface";
import DeleteSupplierInDto from "./DeleteSupplierInDto";

export default class DeleteSupplierUseCase implements useCaseInterface<DeleteSupplierInDto,void>{
    private supplierRepository:SupplierRepositoryInterface;

    constructor(supplierRepository:SupplierRepositoryInterface){
        this.supplierRepository=supplierRepository;
    }
    
   async execute(input: DeleteSupplierInDto): Promise<void> {
        try {
            const findSupplier=await this.supplierRepository.findById(input.id)
            if(findSupplier){
                await this.supplierRepository.deleteById(input.id);
            }else{
                throw new Error("Supplier not found!");
            }
        } catch (error) {
            const err=error as Error;
            throw new Error(err.message);    
        }
    }

}