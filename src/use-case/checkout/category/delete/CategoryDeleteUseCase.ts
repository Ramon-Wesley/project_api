
import CategoryRepositoryInterface from "../../../../domain/checkout/products/category/repository/CategoryRepositoryInterface";
import useCaseInterface from "../../../@shared/UseCaseInterface";
import CategoryDeleteInDto from "./CategoryDeleteInDto";


export default class CategoryDeleteUseCase implements useCaseInterface<CategoryDeleteInDto,void>{
    private categoryRepository:CategoryRepositoryInterface;

    constructor(categoryRepository:CategoryRepositoryInterface){
        this.categoryRepository=categoryRepository;
    }
    
   async execute(input: CategoryDeleteInDto): Promise<void> {
        try {
            const findCategory=await this.categoryRepository.findById(input.id)
            if(findCategory){
                await this.categoryRepository.deleteById(input.id);
            }else{
                throw new Error("Category not found!");
            }
        } catch (error) {
            const err=error as Error;
            throw new Error(err.message);    
        }
    }

}