import { Op } from "sequelize";

import CategoryModel from "../model/CategoryModel";
import Category from "../../../../../../../domain/checkout/products/category/entity/Category";
import CategoryRepositoryInterface from "../../../../../../../domain/checkout/products/category/repository/CategoryRepositoryInterface";
import RepositoryFindAllResult from "../../../../../../../domain/@shared/repository/RepositoryFindAllResult";

export default class CategoryRepositorySequelize implements CategoryRepositoryInterface{
    async create(entity: Category): Promise<void> {
        try {
            await CategoryModel.create({
                id:entity.Id,
                name:entity.Name,
                description:entity.Description
            })
        } catch (error) {
            throw new Error("error creating category record\n"+error)
        }
            
    }
    
    async findById(id: string): Promise<Category> {
        try {
            const findResult=await CategoryModel.findByPk(id);
            if(findResult){
                const result=new Category(findResult.id,findResult.name,findResult.description)
                return result
            }
            throw new Error("category not found!\n")
        } catch (error) {
            throw new Error("error find category record\n"+error)
        }
       
        
    }
    async findAll(sort: "desc" | "asc", filter: string, limit: number, page: number): Promise<RepositoryFindAllResult<Category>> {
      try {
        let findAllCategoryResult:Category[]=[]
       
          const result=await CategoryModel.findAndCountAll({
            where:{name:{[Op.like]:`%${filter}%`}},
            order:[["name",sort]],
            limit:limit,
            offset:(page-1)*limit,
        
          })

           const  totalElements=result.count
           const totalPages = Math.ceil(totalElements / limit);
            let category:Category;
            result.rows.forEach((res)=>{
                category=new Category(res.id,res.name,res.description)
                findAllCategoryResult.push(category)
            })

          
          const findAllResult:RepositoryFindAllResult<Category>={
            entity:findAllCategoryResult,
            current_page:page,
            number_of_elements:totalElements,
            total_page:totalPages
           };
           return findAllResult
      } catch (error) {
        throw new Error("error listing category record!\n"+error)
      }
    }
    async deleteById(id: string): Promise<void> {
        try {
          await CategoryModel.destroy({where:{id:id}})
        } catch (error) {
            throw new Error("error when deleting category record!\n"+error)
        }
    }
    async updateById(id: string, entity: Category): Promise<void> {
        try {
            await CategoryModel.update({
                name:entity.Name,
                description:entity.Description
            },{where:{id:id}})       
        } catch (error) {
            throw new Error("error update category record\n"+error)
        }
}

}