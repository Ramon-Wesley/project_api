import Category from "../../../../domain/checkout/products/category/entity/Category";
import CategoryRepositoryInterface from "../../../../domain/checkout/products/category/repository/CategoryRepositoryInterface";
import useCaseInterface from "../../../@shared/UseCaseInterface";
import CategoryFindINDto from "./CategoryFindInDto";
import CategoryFindOutDto from "./CategoryFindOutDto";


export default class CategoryFindUseCase implements useCaseInterface<CategoryFindINDto,CategoryFindOutDto>{
    private categoryRepository:CategoryRepositoryInterface;
    
    constructor(categoryRepository:CategoryRepositoryInterface){
        this.categoryRepository=categoryRepository;
    }

    async execute(input: CategoryFindINDto): Promise<CategoryFindOutDto> {
        try {
            const result=await this.categoryRepository.findById(input.id);
            if(result){

                const category:CategoryFindOutDto={
                    name:result.Name,
                    description:result.Description,
                    isActive:result.IsActive
                }
                return category
            }
            throw new Error("category not found!")
        } catch (error) {
            const err=error as Error;
            throw new Error(err.message);
        }
    }
    
}