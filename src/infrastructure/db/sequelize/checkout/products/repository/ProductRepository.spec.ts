import { Op } from "sequelize";
import Product from "../../../../../../domain/checkout/products/entity/Product";
import ProductFactory from "../../../../../../domain/checkout/products/factory/Product.factory";
import ProductModel from "../model/ProductModel";
import ProductRepository from "./ProductRepository";
import { Sequelize } from "sequelize-typescript";
import SequelizeDb from "../../../config/SequelizeDB";


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
        const product=ProductFactory.create("product1",10)
        await productRepository.create(product);
        const findProduct=await ProductModel.findByPk(product.Id);

        expect(findProduct?.toJSON()).toStrictEqual({
            id:product.Id,
            name:product.Name,
            price:product.Price
        })
        
    })

    it("update product data correctly",async()=>{
        const productRepository= new ProductRepository();
        const product=ProductFactory.create("product1",10)
        await productRepository.create(product);
        const findProduct=await ProductModel.findByPk(product.Id);

        expect(findProduct?.toJSON()).toStrictEqual({
            id:product.Id,
            name:product.Name,
            price:product.Price
        })
        const productUpdate=new Product(product.Id,"product2",12);
        await productRepository.updateById(product.Id,productUpdate);
        const findProductUpdate=await ProductModel.findByPk(product.Id);

        expect(findProductUpdate?.toJSON()).toStrictEqual({
            id:product.Id,
            name:productUpdate.Name,
            price:productUpdate.Price
        })

        
    })

   it("find product data by id",async()=>{
    const productRepository= new ProductRepository();
        const product=ProductFactory.create("product1",10)
        await productRepository.create(product);
        const findProduct=await ProductModel.findByPk(product.Id);
        const findResult=await productRepository.findById(product.Id)
        expect(findProduct?.toJSON()).toStrictEqual({
            id:findResult.Id,
            name:findResult.Name,
            price:findResult.Price
        })
   })

    it("find all product data",async ()=>{
        const productRepository= new ProductRepository();
        const product=ProductFactory.create("product1",10)
        const product2= ProductFactory.create("product2",12);
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
        expect(findAllProduct.entity[1].Id).toBe(product.Id)
        expect(findAllProduct.entity[1].Name).toBe(product.Name)
        expect(findAllProduct.entity[1].Price).toBe(product.Price)
        expect(findAllProduct.current_page).toBe(page)
        expect(findAllProduct.number_of_elements).toBe(2)
        expect(findAllProduct.total_page).toBe(1)
    })

})