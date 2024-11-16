
import ProductRepositoryInterface from "../../../../domain/checkout/products/repository/ProdoctRepositoryInterface";
import useCaseInterface from "../../../@shared/UseCaseInterface";
import ProductDeleteInDto from "./ProductDeleteInDto";


export default class ProductDeleteUseCase implements useCaseInterface<ProductDeleteInDto,void>{
    private productRepository:ProductRepositoryInterface;

    constructor(productRepository:ProductRepositoryInterface){
        this.productRepository=productRepository;
    }
    
   async execute(input: ProductDeleteInDto): Promise<void> {
        try {
            await this.productRepository.findById(input.id)
    
            await this.productRepository.deleteById(input.id);
            
        } catch (error) {
            throw error   
        }
    }

}