import Category from "../../../../domain/checkout/products/category/entity/Category";
import CategoryRepositoryInterface from "../../../../domain/checkout/products/category/repository/CategoryRepositoryInterface";
import useCaseInterface from "../../../@shared/UseCaseInterface";
import CategoryUpdateInDto from "./CategoryUpdateInDto";



export default class CategoryUpdateUseCase implements useCaseInterface<CategoryUpdateInDto,void>{
    private categoryRepository:CategoryRepositoryInterface;
    
    constructor(categoryRepository:CategoryRepositoryInterface){
        this.categoryRepository=categoryRepository;
    }
    async execute(input: CategoryUpdateInDto): Promise<void> {
        try {
            const category=new Category(input.id,input.name,input.description)
            await this.categoryRepository.updateById(input.id,category);
        } catch (error) {
            throw error
        }
    }


}