import Category from "../../../../domain/checkout/products/category/entity/Category";
import CategoryRepositoryInterface from "../../../../domain/checkout/products/category/repository/CategoryRepositoryInterface";
import Product from "../../../../domain/checkout/products/entity/Product";
import ProductFactory from "../../../../domain/checkout/products/factory/Product.factory";
import ProductRepositoryInterface from "../../../../domain/checkout/products/repository/ProdoctRepositoryInterface";
import CategoryModel from "../../../../infrastructure/db/sequelize/checkout/products/category/model/CategoryModel";
import ProductModel from "../../../../infrastructure/db/sequelize/checkout/products/model/ProductModel";
import useCaseInterface from "../../../@shared/UseCaseInterface";
import ProductUpdateInDto from "./ProductUpdateInDto";


export default class ProductUpdateUseCase implements useCaseInterface<ProductUpdateInDto,void>{
    
    private productRepository:ProductRepositoryInterface;
    private categoryRepository:CategoryRepositoryInterface;

    constructor(productRepository:ProductRepositoryInterface,categoryRepository:CategoryRepositoryInterface){
        this.productRepository=productRepository;
        this.categoryRepository=categoryRepository;
    }
    
    async execute(input: ProductUpdateInDto): Promise<void> {
        try {
            console.log("INICIO--------")
            const product=await this.productRepository.findById(input.id);
            console.log("FIM---------")
            const category=await this.categoryRepository.findById(input.category_id)
            
            if(product && category){
                product.changeCategory_id(category.Id)
                product.changeName(input.name)
                product.changePrice(input.price)
                product.changeQuantity(input.quantity)       
                console.log(product)
                await this.productRepository.updateById(input.id,product)
                return
            }

        } catch (error) {
            const err=error as Error
            throw new Error(err.message)
        }
    }

}