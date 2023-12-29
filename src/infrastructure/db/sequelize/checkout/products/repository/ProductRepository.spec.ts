import { Op } from "sequelize";
import Product from "../../../../../../domain/checkout/products/entity/Product";
import ProductFactory from "../../../../../../domain/checkout/products/factory/Product.factory";
import ProductModel from "../model/ProductModel";
import ProductRepository from "./ProductRepository";
import { Sequelize } from "sequelize-typescript";
import SequelizeDb from "../../../config/SequelizeDB";
import CategoryModel from "../category/model/CategoryModel";
import CategoryFactory from "../../../../../../domain/checkout/products/category/factory/CategoryFactory";


describe("Test the product repository", ()=>{
  
   
    let sequelize:Sequelize;  

      
    beforeEach(async()=>{ 
        sequelize= await SequelizeDb.getInstance();             
  
      })
  
       afterEach(async()=>{
          await sequelize.close()
          
      })
    it("save product data correctly",async()=>{
        const productRepository= new ProductRepository();
        const category=CategoryFactory.create("category1","category1 description")
        await CategoryModel.create({id:category.Id,name:category.Name,description:category.Description})
        const product=ProductFactory.create("product1",10,10,category.Id)
        await productRepository.create(product);
        const findProduct=await ProductModel.findByPk(product.Id);

        expect(findProduct?.toJSON()).toStrictEqual({
            id:product.Id,
            name:product.Name,
            price:product.Price,
            quantity:product.Quantity,
            category_id:product.Category_id
        })
        
    })

    it("update product data correctly",async()=>{
        const productRepository= new ProductRepository();
        const category=CategoryFactory.create("category1","category1 description")
        await CategoryModel.create({id:category.Id,name:category.Name,description:category.Description})
        const product=ProductFactory.create("product1",10,10,category.Id)
        await productRepository.create(product);
        

        const productUpdate=new Product(product.Id,"product2",12,10,category.Id);
        await productRepository.updateById(product.Id,productUpdate);
        const findProductUpdate=await ProductModel.findByPk(product.Id);

        expect(findProductUpdate?.toJSON()).toStrictEqual({
            id:product.Id,
            name:productUpdate.Name,
            price:productUpdate.Price,
            quantity:productUpdate.Quantity,
            category_id:productUpdate.Category_id

        })

        
    })

   it("find product data by id",async()=>{
    const productRepository= new ProductRepository();
    const category=CategoryFactory.create("category1","category1 description")
    await CategoryModel.create({id:category.Id,name:category.Name,description:category.Description})
    const product=ProductFactory.create("product1",10,10,category.Id)

        await productRepository.create(product);
        const findProduct=await ProductModel.findByPk(product.Id);
        const findResult=await productRepository.findById(product.Id)
        expect(findProduct?.toJSON()).toStrictEqual({
            id:findResult.Id,
            name:findResult.Name,
            price:findResult.Price,
            quantity:findResult.Quantity,
            category_id:findResult.Category_id
        })
   })

    it("find all product data",async ()=>{
        const productRepository= new ProductRepository();
        const category=CategoryFactory.create("category1","category1 description")
        await CategoryModel.create({id:category.Id,name:category.Name,description:category.Description})
        const product=ProductFactory.create("product1",10,10,category.Id)
        const product2= ProductFactory.create("product2",12,12,category.Id);
        await productRepository.create(product);
        await productRepository.create(product2);
        
        const sort="desc"
        const filter=""
        const limit=7
        const page=1

        const findAllProduct=await productRepository.findAll(sort,filter,limit,page)
        
        expect(findAllProduct.entity[0].Id).toBe(product2.Id)
        expect(findAllProduct.entity[0].Name).toBe(product2.Name)
        expect(findAllProduct.entity[0].Price).toBe(product2.Price)
        expect(findAllProduct.entity[0].Quantity).toBe(product2.Quantity)
        expect(findAllProduct.entity[0].Category_id).toBe(product2.Category_id)
        expect(findAllProduct.entity[1].Id).toBe(product.Id)
        expect(findAllProduct.entity[1].Name).toBe(product.Name)
        expect(findAllProduct.entity[1].Price).toBe(product.Price)
        expect(findAllProduct.entity[1].Quantity).toBe(product.Quantity)
        expect(findAllProduct.entity[1].Category_id).toBe(product.Category_id)
        expect(findAllProduct.current_page).toBe(page)
        expect(findAllProduct.number_of_elements).toBe(2)
        expect(findAllProduct.total_page).toBe(1)
    })

})