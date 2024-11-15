import { Op, Transaction } from "sequelize";
import RepositoryFindAllResult from "../../../../../../domain/@shared/repository/RepositoryFindAllResult";

import SaleOrder from "../../../../../../domain/checkout/salesOrder/entity/SalesOrder";
import SaleOrderItem from "../../../../../../domain/checkout/salesOrder/salesOrder-item/entity/SalesOrder-item";
import SaleOrderRepositoryInterface from "../../../../../../domain/checkout/salesOrder/repository/SalesOrder.repository";
import { SaleOrderItemModel } from "../model/SaleOrderItemModel";
import { SaleOrderModel } from "../model/SaleOrderModel";
import { Sequelize } from "sequelize-typescript";
import DatabaseError from "../../../../../../domain/@shared/Errors/DatabaseError";
import Product from "../../../../../../domain/checkout/products/entity/Product";
import ProductModel from "../../products/model/ProductModel";
import { version } from "os";
import ProductRepositoryInterface from "../../../../../../domain/checkout/products/repository/ProdoctRepositoryInterface";
import SequelizeDb from "../../../config/SequelizeDB";
import ProductRepositorySequelize from "../../products/repository/ProductRepository";

export default class SaleOrderRepositorySequelize implements SaleOrderRepositoryInterface{
   
    
    async create(entity: SaleOrder, products: Product[]): Promise<void> {
        try {
          const sequelize= (await SequelizeDb.getInstance())
          const transaction = await sequelize.transaction();
        await SaleOrderModel.create({
                 id:entity.Id,
                 customer_id:entity.Customer_id,
                 employee_id:entity.Employee_id,
                 date:entity.Data,
                 total:entity.Total,
                 discount:entity.Discount
            },{transaction});

            await Promise.all(products.map((product) => 
                ProductModel.update(
                    {
                        quantity: product.Quantity,
                        version: product.Version + 1
                    },
                    {
                        where: {
                            id: product.Id,
                            version: product.Version
                        }
                    }
                    
            )))
            await transaction.commit();
   
        } catch (error) {
        throw new DatabaseError("error creating saleOrder record\n") 
        }
        
    }


    async findById(id: string): Promise<SaleOrder> {
        try {
            const saleOrder= await SaleOrderModel.findByPk(id,{include:[SaleOrderItemModel]})
            if(saleOrder){
                const saleOrderItem=saleOrder.items.map((res)=>{
                   return new SaleOrderItem(res.id,res.product_id,res.quantity,res.price);
                })
                const result=new SaleOrder(saleOrder.id,saleOrder.customer_id,saleOrder.employee_id,saleOrderItem);
                result.changeDate(saleOrder.date)
                return result
              }
            throw new DatabaseError("saleOrder not found!")
        } catch (error) {
            throw new DatabaseError("error when fetching saleOrder record!\n")
            
        }
    }


    async findAll(sort: "desc" | "asc"="desc", filter: string="", limit: number=10, page: number=1): Promise<RepositoryFindAllResult<SaleOrder>> {
        try {
            const saleOrder=await SaleOrderModel.findAndCountAll({
            
                order:[["date",sort]],
                limit:limit,
                offset:(page-1)*limit,
                include: [{ model: SaleOrderItemModel}]
            })
            const totalElements=saleOrder.count
            const totalPages = Math.ceil(totalElements / limit);
            const saleOrderResult=saleOrder.rows.map((res)=>{
                const saleOrderItem=res.items.map((item)=>{
                    return new SaleOrderItem(item.id,item.product_id,item.quantity,item.price)
                })
                const result =new SaleOrder(res.id,res.customer_id,res.employee_id,saleOrderItem);
                result.changeDate(res.date)
                return result
            })

            const findAllResult:RepositoryFindAllResult<SaleOrder>={
                entity:saleOrderResult,
                current_page:page,
                number_of_elements:totalElements,
                total_page:totalPages
               };

            return findAllResult;

        } catch (error) {
            throw new DatabaseError("error listing saleOrder record!\n")
            
        }
    }
    
   async updateById(id: string, entity: SaleOrder,products:Product[]): Promise<void> {
    const sequelize= (await SequelizeDb.getInstance())
    const transaction = await sequelize.transaction();
    const productRepository = new ProductRepositorySequelize();

  try {
    const saleOrder = await SaleOrderModel.findByPk(id, { include: [SaleOrderItemModel] , transaction });

    if (!saleOrder) {
      throw new Error(`sale order with ID ${id} not found`);
    }

    // Identificar quais produtos devem ser excluídos
    const productsIdsExclude = saleOrder?.items
      .filter(existingItem => !entity.SalesOrderItems.some(newItem => newItem.ProductId === existingItem.product_id))
      .map(item => item.product_id) || [];

    // Excluir itens de pedido que não estão mais presentes
    if (productsIdsExclude.length > 0) {
      await SaleOrderItemModel.destroy({
        where: {
          order_id: id,
          product_id: {
            [Op.in]: productsIdsExclude
          }
        },
        transaction
      });
    }

  await Promise.all(
    [
      ...products.map(async (product) => {
       const[updateRows] =await ProductModel.update(
          {
           quantity: product.Quantity,
           version: product.Version + 1
          },{
          where: {
            id: product.Id,
            version: product.Version
          },
          transaction
          })

          if(updateRows === 0){
            throw new DatabaseError("error when updating product record!\n")
          }
      }
    ),
      SaleOrderModel.update(
        {
         customer_id: entity.Customer_id,
         employee_id: entity.Employee_id,
         date: entity.Data,
         total: entity.Total,
         discount: entity.Discount,
     
        },{
        where: {
          id: id
        },
          transaction
        }),
        ...entity.SalesOrderItems.map(async (item) => {
           await SaleOrderItemModel.upsert(
            {
             id: item.Id,
             product_id: item.ProductId,
             order_id: id,
             quantity: item.Quantity,
             price: item.UnitaryValue,
             total: item.Total,
            },{
              transaction
            })
        })
    ]);




  await transaction.commit();

  } catch (error) {
    await transaction.rollback();
    throw new DatabaseError("error when updating saleOrder record!\n")
  }
}
   async deleteById(id: string): Promise<void> {
        try {
            await SaleOrderModel.destroy({where:{id:id}});
        } catch (error) {
            throw new DatabaseError("error when deleting saleOrder record!\n")
            
          }
    }

}