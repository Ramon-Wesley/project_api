import { json, Op, Transaction } from "sequelize";
import RepositoryFindAllResult from "../../../../../../domain/@shared/repository/RepositoryFindAllResult";

import PurchaseOrder from "../../../../../../domain/checkout/purchaseOrder/entity/PurchaseOrder";
import PurchaseOrderItem from "../../../../../../domain/checkout/purchaseOrder/purchaseOrder-item/entity/PurchaseOrder-item";
import PurchaseOrderRepositoryInterface from "../../../../../../domain/checkout/purchaseOrder/repository/PurchaseOrder.repository";
import { PurchaseOrderItemModel } from "../model/PurchaseOrderItemModel";
import { PurchaseOrderModel } from "../model/PurchaseOrderModel";
import { Sequelize } from "sequelize-typescript";
import Product from "../../../../../../domain/checkout/products/entity/Product";
import ProductModel from "../../products/model/ProductModel";
import ProductRepositoryInterface from "../../../../../../domain/checkout/products/repository/ProdoctRepositoryInterface";
import DatabaseError from "../../../../../../domain/@shared/Errors/DatabaseError";
import SequelizeDb from "../../../config/SequelizeDB";
import ProductRepositorySequelize from "../../products/repository/ProductRepository";
import { OrganizeImportsMode } from "typescript";

export default class PurchaseOrderRepositorySequelize implements PurchaseOrderRepositoryInterface{


    async create(entity: PurchaseOrder, products: Product[]): Promise<void> {
        const sequelize = await SequelizeDb.getInstance();
    
        const transaction = await sequelize.transaction();
    
        try {
            
            const purchaseOrder = await PurchaseOrderModel.create({
                id: entity.Id,
                supplier_id: entity.Supplier_id,
                employee_id: entity.Employee_id,
                date: entity.Data,
                total: entity.Total,
                discount: entity.Discount
            }, { transaction });
    
            const orderId = purchaseOrder.id;
    
            const productUpdates = products.map(product =>
                ProductModel.update(
                    {
                        quantity: product.Quantity,
                        version: product.Version + 1
                    },
                    {
                        where: {
                            id: product.Id,
                            version: product.Version
                        },
                        transaction
                    }
                )
            );
    
      
            const orderItemUpserts = entity.PurchaseOrderItems.map(item =>
                PurchaseOrderItemModel.create(
                    {
                        id: item.Id, // Assume que o Id do item de pedido é passado corretamente
                        product_id: item.ProductId,
                        order_id: orderId, // Usando o ID do pedido criado
                        quantity: item.Quantity,
                        price: item.UnitaryValue,
                        total: item.Total
                    },
                    {
                        transaction
                    }
                )
            );
    
          
            await Promise.all([...productUpdates, ...orderItemUpserts]);
    
            
            await transaction.commit();
        } catch (error) {
          
            await transaction.rollback();
            console.error(error);
            throw new DatabaseError("Error when creating purchaseOrder record!\n" + error);
        }
    }
    
    
    
  

    async findById(id: string): Promise<PurchaseOrder> {
        try {
            const purchasesOrder= await PurchaseOrderModel.findByPk(id,{include:[PurchaseOrderItemModel]})
            if(purchasesOrder){
                const purchasesOrderItem=purchasesOrder.items.map((res)=>{
                   return new PurchaseOrderItem(res.id,res.product_id,res.quantity,res.price);
                })
                const result=new PurchaseOrder(purchasesOrder.id,purchasesOrder.supplier_id,purchasesOrder.employee_id,purchasesOrderItem);
                result.changeDate(purchasesOrder.date)
                return result
              }
            throw new DatabaseError("purchasesOrder not found!")
        } catch (error) {
            throw new DatabaseError("error when fetching purchasesOrder record!\n")
            
        }
    }


    async findAll(sort: "desc" | "asc"="desc", filter: string="", limit: number=10, page: number=1): Promise<RepositoryFindAllResult<PurchaseOrder>> {
        try {
            const purchasesOrder=await PurchaseOrderModel.findAndCountAll(
                {
                    include:[PurchaseOrderItemModel],
                    order:[["date",sort]],
                    limit:limit,
                    offset:(page-1)*limit
                }
            )
            const totalElements=purchasesOrder.count
            const totalPages = Math.ceil(totalElements / limit);
            const purchasesOrderResult=purchasesOrder.rows.map((res)=>{
                const purchasesOrderItem=res.items.map((item)=>{
                    return new PurchaseOrderItem(item.id,item.product_id,item.quantity,item.price)
                })
                const result =new PurchaseOrder(res.id,res.supplier_id,res.employee_id,purchasesOrderItem);
                result.changeDate(res.date)
                return result
            })

            const findAllResult:RepositoryFindAllResult<PurchaseOrder>={
                entity:purchasesOrderResult,
                current_page:page,
                number_of_elements:totalElements,
                total_page:totalPages
               };

            return findAllResult;

        } catch (error) {
            console.error(error)
            throw new DatabaseError("error listing purchasesOrder record!\n"+error)
            
        }
        
    }
    

async updateById(id: string, entity: PurchaseOrder,products:Product[]): Promise<void> {
    const sequelize= (await SequelizeDb.getInstance())
    const transaction = await sequelize.transaction();
    const productRepository = new ProductRepositorySequelize();
  try {
    const purchasesOrderModel = await PurchaseOrderModel.findByPk(id, 
      { include: [PurchaseOrderItemModel] , transaction });

      if (!purchasesOrderModel) {
        throw new Error(`purchase order with ID ${id} not found`);
    }
    
    // Identificar quais produtos devem ser excluídos
    const productsIdsExclude = purchasesOrderModel?.items
        .filter(existingItem => !entity.PurchaseOrderItems.some(newItem => newItem.ProductId === existingItem.product_id))
        .map(item => item.product_id) || [];
    
    // Excluir itens de pedido que não estão mais presentes
    if (productsIdsExclude.length > 0) {
        await PurchaseOrderItemModel.destroy({
            where: {
                order_id: id,
                product_id: {
                    [Op.in]: productsIdsExclude
                }
            },
            transaction
        });
    }

    // Atualizar produtos em paralelo
    await Promise.all([
       ...products.map(async (product) => {
       const [updated]= await ProductModel.update({
            quantity: product.Quantity,
            version: product.Version + 1
        }, {
            where: { id: product.Id, version: product.Version },
            transaction
        })

        if (updated === 0) {
            throw new DatabaseError(`Product with ID ${product.Id} not found or version mismatch`);
        }
    }
    ),
    PurchaseOrderModel.update({
        supplier_id: entity.Supplier_id,
        employee_id: entity.Employee_id,
        date: entity.Data,
        total: entity.Total,
        discount: entity.Discount
    }, {
        where: { id: id }, 
        transaction
    }),
    ...entity.PurchaseOrderItems.map(async(item) =>
        {
           await PurchaseOrderItemModel.upsert(
            {
                 id: item.Id, // Assume que o Id do item de pedido é passado corretamente
                 product_id: item.ProductId,
                 order_id: id, // O ID do pedido
                 quantity: item.Quantity,
                 price: item.UnitaryValue,
                 total: item.Total
             }, {
                transaction 
            }
        )

         }
         )

]
)
    await transaction.commit();
} catch (error) {
    
    await transaction.rollback();
    throw new DatabaseError("error when updating PurchaseOrder record!\n")
}
}


   async deleteById(id: string): Promise<void> {
        try {
            await PurchaseOrderModel.destroy({where:{id:id}});
        } catch (error) {
            throw new DatabaseError("error when deleting purchasesOrder record!\n")
            
          }
    }

}