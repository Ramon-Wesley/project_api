
import ProductRepositoryInterface from "../../../../domain/checkout/products/repository/ProdoctRepositoryInterface";
import useCaseInterface from "../../../@shared/UseCaseInterface";
import ProductFindINDto from "./ProductFindInDto";
import ProductFindOutDto from "./ProductFindOutDto";


export default class ProductFindUseCase implements useCaseInterface<ProductFindINDto,ProductFindOutDto>{
    private productRepository:ProductRepositoryInterface;
    
    constructor(productRepository:ProductRepositoryInterface){
        this.productRepository=productRepository;
    }

    async execute(input: ProductFindINDto): Promise<ProductFindOutDto> {
        try {
            const result=await this.productRepository.findById(input.id);
            
                const product:ProductFindOutDto={
                    name:result.Name,           
                    price:result.Price,
                    quantity:result.Quantity,
                    category_id:result.Category_id,
                    isActive:result.IsActive
                }

            return product
           
        } catch (error) {
            const err=error as Error;
            throw new Error(err.message);
        }
    }
    
}