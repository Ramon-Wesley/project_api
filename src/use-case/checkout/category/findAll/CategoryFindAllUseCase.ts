
import CategoryRepositoryInterface from "../../../../domain/checkout/products/category/repository/CategoryRepositoryInterface";
import useCaseInterface from "../../../@shared/UseCaseInterface";
import CategoryFindAllInDto from "./CategoryFindAllInDto";
import CategoryFindAllOutDto from "./CategoryFindAllOutDto";


export default class CategoryFindAllUseCase implements useCaseInterface<CategoryFindAllInDto,CategoryFindAllOutDto>{
    private categoryRepository:CategoryRepositoryInterface;

    constructor(categoryRepository:CategoryRepositoryInterface){
        this.categoryRepository=categoryRepository;
    }

    async execute(input: CategoryFindAllInDto): Promise<CategoryFindAllOutDto> {
        try {
           
          const result=await this.categoryRepository.findAll(input.sort,input.filter,input.limit,input.page);  
          console.log(result)
          const findResult:CategoryFindAllOutDto={
              entity: result.entity.map((res) =>{return{
                id: res.Id,
                name: res.Name,
                description: res.Description,
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