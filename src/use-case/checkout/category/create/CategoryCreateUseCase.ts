
import CategoryFactory from "../../../../domain/checkout/products/category/factory/CategoryFactory";
import CategoryRepositoryInterface from "../../../../domain/checkout/products/category/repository/CategoryRepositoryInterface";
import useCaseInterface from "../../../@shared/UseCaseInterface";
import CategoryCreateInDto from "./CategoryCreateInDto";

export default class CategoryCreateUseCase implements useCaseInterface<CategoryCreateInDto,void>{
    private categoryRepository:CategoryRepositoryInterface;
    constructor(categoryRepository:CategoryRepositoryInterface){
        this.categoryRepository=categoryRepository;
    }
    async execute(input: CategoryCreateInDto): Promise<void> {
        try {
            const category=CategoryFactory.create(input.name,input.description)
            await this.categoryRepository.create(category)
        } catch (error) {
            throw error
        }
    }

}