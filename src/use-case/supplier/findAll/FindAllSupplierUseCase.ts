
import SupplierRepositoryInterface from "../../../domain/supplier/repository/SupplierRepositoryInterface";
import useCaseInterface from "../../@shared/UseCaseInterface";
import FindAllSupplierInDto from "./FindAllSupplierInDto";
import FindAllSupplierOutDto from "./FindAllSupplierOutDto";


export default class FindAllSupplierUseCase implements useCaseInterface<FindAllSupplierInDto,FindAllSupplierOutDto>{
    private supplierRepository:SupplierRepositoryInterface;

    constructor(supplierRepository:SupplierRepositoryInterface){
        this.supplierRepository=supplierRepository;
    }

    async execute(input: FindAllSupplierInDto): Promise<FindAllSupplierOutDto> {
        try {
           
          const result=await this.supplierRepository.findAll(input.sort,input.filter,input.limit,input.page);  
  
          const findResult:FindAllSupplierOutDto={
              entity: result.entity.map((res) =>{return{
                id:res.Id,
                name:res.Name,
                cnpj:res.Cnpj,
                email:res.Email,
                date_of_birth:res.Date_of_birth,
                address:{
                    uf:res.Address?.Uf,
                    city:res.Address?.City,
                    neighborhood:res.Address?.Neighborhood,
                    zipCode:res.Address?.ZipCode,
                    street:res.Address?.Street,
                    number:res.Address?.Number,
                    description:res.Address?.Description,
                },
            isActive:res.IsActive
            }
        } ),
            current_page:result.current_page,
            number_of_elements:result.number_of_elements,
            total_page:result.total_page
        }
   
          return findResult;
        } catch (error) {
            const err= error as Error;
            throw new Error(err.message)
        }
    }
}