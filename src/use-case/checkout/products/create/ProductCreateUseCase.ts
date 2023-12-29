import ProductFactory from "../../../../domain/checkout/products/factory/Product.factory";
import ProductRepositoryInterface from "../../../../domain/checkout/products/repository/ProdoctRepositoryInterface";
import useCaseInterface from "../../../@shared/UseCaseInterface";
import ProductCreateInDto from "./ProductCreateInDto";

export default class ProductCreateUseCase implements useCaseInterface<ProductCreateInDto,void>{
    private productRepository:ProductRepositoryInterface;
    constructor(productRepository:ProductRepositoryInterface){
        this.productRepository=productRepository;
    }
    async execute(input: ProductCreateInDto): Promise<void> {
        try {
            const product=ProductFactory.create(input.name,input.price,input.quantity,input.category_id)
            await this.productRepository.create(product)
        } catch (error) {
            const err=error as Error
            throw new Error(err.message)
        }
    }

}