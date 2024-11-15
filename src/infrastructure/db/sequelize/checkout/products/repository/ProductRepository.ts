import { Op, Sequelize, SequelizeScopeError } from "sequelize";
import RepositoryFindAllResult from "../../../../../../domain/@shared/repository/RepositoryFindAllResult";
import Product from "../../../../../../domain/checkout/products/entity/Product";
import ProductRepositoryInterface from "../../../../../../domain/checkout/products/repository/ProdoctRepositoryInterface";
import ProductModel from "../model/ProductModel";
import { tryCatch } from "bullmq";
import DatabaseError from "../../../../../../domain/@shared/Errors/DatabaseError";

export default class ProductRepositorySequelize implements ProductRepositoryInterface{
    async updateQuantity(id: string, quantity: number): Promise<void> {
        try {
            await ProductModel.update({quantity:quantity},{where:{id:id}})
        } catch (error ) {
            throw new DatabaseError("error updating product quantity\n")
        }
    }
    async create(entity: Product): Promise<void> {
        try {
            await ProductModel.create({
                id:entity.Id,
                name:entity.Name,
                price:entity.Price,
                quantity:entity.Quantity,
                category_id:entity.Category_id
            })
        } catch (error) {
            throw new DatabaseError("error creating product record\n"+error)
        }
            
    }
    
    async findById(id: string): Promise<Product> {
        try {
            const findResult=await ProductModel.findByPk(id);
            if(findResult){
                const result=new Product(findResult.id,findResult.name,findResult.price,findResult.quantity,findResult.category_id,findResult.version)
                return result
            }
            throw new DatabaseError("product not found!\n")
        } catch (error) {
            throw new DatabaseError("error find product record\n")
        }
       
        
    }
    async findAll(sort: "desc" | "asc", filter: string, limit: number, page: number): Promise<RepositoryFindAllResult<Product>> {
      try {
        let findAllProductResult:Product[]=[]
       
          const result=await ProductModel.findAndCountAll({
            where:{name:{[Op.like]:`%${filter}%`}},
            order:[["name",sort]],
            limit:limit,
            offset:(page-1)*limit,
        
          })

           const  totalElements=result.count
           const totalPages = Math.ceil(totalElements / limit);
            let product:Product;
            result.rows.forEach((res)=>{
                console.log(res)
                product=new Product(res.id,res.name,res.price,res.quantity,res.category_id,res.version)
                findAllProductResult.push(product)
            })

          
          const findAllResult:RepositoryFindAllResult<Product>={
            entity:findAllProductResult,
            current_page:page,
            number_of_elements:totalElements,
            total_page:totalPages
           };
           return findAllResult
      } catch (error) {
        throw new DatabaseError("error listing product record!\n")
      }
    }
    async deleteById(id: string): Promise<void> {
        try {
          await ProductModel.destroy({where:{id:id}})
        } catch (error) {
            throw new DatabaseError("error when deleting product record!\n")
        }
    }
    async updateById(id: string, entity: Product,transaction:boolean=false): Promise<void> {
        try {
            
            
                await ProductModel.update({
                    name:entity.Name,
                    price:entity.Price,
                    quantity:entity.Quantity,
                    category_id:entity.Category_id,
                    version:entity.Version+1
                },{where:{id:id,version:entity.Version}}) 
            
                
        } catch (error) {
            throw new DatabaseError("error when updating product record!\n")
        }
}

    async findByIds(ids:string[]):Promise<Product[]>{
        try {
    
            const products=await ProductModel.findAll({
                where:{
                    id:{
                        [Op.in]: ids
                    }
        }
    })
    
    let findAllProductResult:Product[]=[];
    
    if(products.length>0){
        let product;
       products.forEach((res)=>{
            product=new Product(res.id,res.name,res.price,res.quantity,res.category_id,res.version)
            findAllProductResult.push(product)
        })
    }
    return findAllProductResult

        } catch (error) {
            throw new DatabaseError("error when fetching product record!\n")
        }
    }
}