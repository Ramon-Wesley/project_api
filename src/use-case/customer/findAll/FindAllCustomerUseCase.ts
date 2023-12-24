import CustomerRepositoryInterface from "../../../domain/customer/repository/CustomerRepositoryInterface";
import useCaseInterface from "../../@shared/UseCaseInterface";
import FindAllCustomerInDto from "./FindAllCustomerInDto";
import FindAllCustomerOutDto from "./FindAllCustomerOutDto";

export default class FindAllCustomerUseCase implements useCaseInterface<FindAllCustomerInDto,FindAllCustomerOutDto>{
    private customerRepository:CustomerRepositoryInterface;

    constructor(customerRepository:CustomerRepositoryInterface){
        this.customerRepository=customerRepository;
    }

    async execute(input: FindAllCustomerInDto): Promise<FindAllCustomerOutDto> {
        try {
           
          const result=await this.customerRepository.findAll(input.sort,input.filter,input.limit,input.page);  
          console.log(result)
          const findResult:FindAllCustomerOutDto={
              entity: result.entity.map((res) =>{return{
                id:res.Id,
                name:res.Name,
                cpf:res.Cpf,
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