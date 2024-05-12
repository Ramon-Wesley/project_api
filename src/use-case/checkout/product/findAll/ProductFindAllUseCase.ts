
import ProductRepositoryInterface from "../../../../domain/checkout/products/repository/ProdoctRepositoryInterface";
import useCaseInterface from "../../../@shared/UseCaseInterface";
import ProductFindAllInDto from "./ProductFindAllInDto";
import ProductFindAllOutDto from "./ProductFindAllOutDto";


export default class ProductFindAllUseCase implements useCaseInterface<ProductFindAllInDto,ProductFindAllOutDto>{
    private productRepository:ProductRepositoryInterface;

    constructor(productRepository:ProductRepositoryInterface){
        this.productRepository=productRepository;
    }

    async execute(input: ProductFindAllInDto): Promise<ProductFindAllOutDto> {
        try {
           
          const result=await this.productRepository.findAll(input.sort,input.filter,input.limit,input.page);  
     
          const findResult:ProductFindAllOutDto={
              entity: result.entity.map((res) =>{return{
                id: res.Id,
                name: res.Name,
                price: res.Price,
                quantity:res.Quantity,
                category_id:res.Category_id,
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