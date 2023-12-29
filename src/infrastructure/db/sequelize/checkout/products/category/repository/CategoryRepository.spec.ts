import Category from "../../../../../../../domain/checkout/products/category/entity/Category";
import CategoryFactory from "../../../../../../../domain/checkout/products/category/factory/CategoryFactory";
import SequelizeDb from "../../../../config/SequelizeDB";
import CategoryModel from "../model/CategoryModel";
import CategoryRepository from "./CategoryRepository";
import { Sequelize } from "sequelize-typescript";



describe("Test the category repository", ()=>{
  
   
    let sequelize:Sequelize;  

      
    beforeEach(async()=>{ 
        sequelize= await SequelizeDb.getInstance();             
  
      })
  
       afterEach(async()=>{
          await sequelize.close()
          
      })
    it("save category data correctly",async()=>{
        const categoryRepository= new CategoryRepository();
        const category=CategoryFactory.create("category1","category description")
        await categoryRepository.create(category);
        const findCategory=await CategoryModel.findByPk(category.Id);

        expect(findCategory?.toJSON()).toStrictEqual({
            id:category.Id,
            name:category.Name,
            description:category.Description
        })
        
    })

    it("update category data correctly",async()=>{
        const categoryRepository= new CategoryRepository();
        const category=CategoryFactory.create("category1","category description")
        await categoryRepository.create(category);
        const findCategory=await CategoryModel.findByPk(category.Id);

        expect(findCategory?.toJSON()).toStrictEqual({
            id:category.Id,
            name:category.Name,
            description:category.Description
        })
        const categoryUpdate=new Category(category.Id,"category2","category description");
        await categoryRepository.updateById(category.Id,categoryUpdate);
        const findCategoryUpdate=await CategoryModel.findByPk(category.Id);

        expect(findCategoryUpdate?.toJSON()).toStrictEqual({
            id:category.Id,
            name:categoryUpdate.Name,
            description:categoryUpdate.Description
        })

        
    })

   it("find category data by id",async()=>{
    const categoryRepository= new CategoryRepository();
        const category=CategoryFactory.create("category1","category description")
        await categoryRepository.create(category);
        const findCategory=await CategoryModel.findByPk(category.Id);
        const findResult=await categoryRepository.findById(category.Id)
        expect(findCategory?.toJSON()).toStrictEqual({
            id:findResult.Id,
            name:findResult.Name,
            description:findResult.Description
        })
   })

    it("find all category data",async ()=>{
        const categoryRepository= new CategoryRepository();
        const category=CategoryFactory.create("category1","category description")
        const category2= CategoryFactory.create("category2","category description");
        await categoryRepository.create(category);
        await categoryRepository.create(category2);
        
        const sort="desc"
        const filter=""
        const limit=7
        const page=1

        const findAllCategory=await categoryRepository.findAll(sort,filter,limit,page)
        
        expect(findAllCategory.entity[0].Id).toBe(category2.Id)
        expect(findAllCategory.entity[0].Name).toBe(category2.Name)
        expect(findAllCategory.entity[0].Description).toBe(category2.Description)
        expect(findAllCategory.entity[1].Id).toBe(category.Id)
        expect(findAllCategory.entity[1].Name).toBe(category.Name)
        expect(findAllCategory.entity[1].Description).toBe(category.Description)
        expect(findAllCategory.current_page).toBe(page)
        expect(findAllCategory.number_of_elements).toBe(2)
        expect(findAllCategory.total_page).toBe(1)
    })

})