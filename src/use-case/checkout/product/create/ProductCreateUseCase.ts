import CategoryRepositoryInterface from "../../../../domain/checkout/products/category/repository/CategoryRepositoryInterface";
import ProductFactory from "../../../../domain/checkout/products/factory/Product.factory";
import ProductRepositoryInterface from "../../../../domain/checkout/products/repository/ProdoctRepositoryInterface";
import useCaseInterface from "../../../@shared/UseCaseInterface";
import ProductCreateInDto from "./ProductCreateInDto";

export default class ProductCreateUseCase implements useCaseInterface<ProductCreateInDto,void>{
    
    private productRepository:ProductRepositoryInterface;
    private categoryRepository:CategoryRepositoryInterface;

    constructor(productRepository:ProductRepositoryInterface,categoryRepository:CategoryRepositoryInterface){
        this.productRepository=productRepository;
        this.categoryRepository=categoryRepository;
    }

    async execute(input: ProductCreateInDto): Promise<void> {
        try {
            const category= await this.categoryRepository.findById(input.category_id)
            const product=ProductFactory.create(input.name,input.price,input.quantity,category.Id)
            
            await this.productRepository.create(product)
        } catch (error) {
            throw error
        }
    }

}