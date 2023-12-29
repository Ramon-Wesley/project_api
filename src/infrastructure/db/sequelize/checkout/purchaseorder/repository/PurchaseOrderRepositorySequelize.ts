import { Op, Transaction } from "sequelize";
import RepositoryFindAllResult from "../../../../../../domain/@shared/repository/RepositoryFindAllResult";

import PurchaseOrder from "../../../../../../domain/checkout/purchaseOrder/entity/PurchaseOrder";
import PurchaseOrderItem from "../../../../../../domain/checkout/purchaseOrder/purchaseOrder-item/entity/PurchaseOrder-item";
import PurchaseOrderRepositoryInterface from "../../../../../../domain/checkout/purchaseOrder/repository/PurchaseOrder.repossitory";
import { PurchaseOrderItemModel } from "../model/PurchaseOrderItemModel";
import { PurchaseOrderModel } from "../model/PurchaseOrderModel";
import { Sequelize } from "sequelize-typescript";

export default class PurchaseOrderRepositorySequelize implements PurchaseOrderRepositoryInterface{
   
    private sequelize:Sequelize;
    constructor(sequelize:Sequelize){
        this.sequelize=sequelize;
    }
   
    async create(entity: PurchaseOrder): Promise<void> {
        try {
        await PurchaseOrderModel.create({
                 id:entity.Id,
                 customer_id:entity.Customer_id,
                 employee_id:entity.Employee_id,
                 date:entity.Data,
                 total:entity.Total,
                 items:entity.PurchaseOrderItems.map((res)=>({
                    id:res.Id,
                    product_id:res.ProductId,
                    order_id:entity.Id,
                    quantity:res.Quantity,
                    price:res.UnitaryValue,
                    total:res.Total
                 })),
                 discount:entity.Discount
            },{include:[PurchaseOrderItemModel]})
   
        } catch (error) {
        throw new Error("error creating purchaseOrder record\n"+error);   
        }
        
    }


    async findById(id: string): Promise<PurchaseOrder> {
        try {
            const purchaseOrder= await PurchaseOrderModel.findByPk(id,{include:[PurchaseOrderItemModel]})
            if(purchaseOrder){
                const purchaseOrderItem=purchaseOrder.items.map((res)=>{
                   return new PurchaseOrderItem(res.id,res.product_id,res.quantity,res.price);
                })
                const result=new PurchaseOrder(purchaseOrder.id,purchaseOrder.customer_id,purchaseOrder.employee_id,purchaseOrderItem);
                result.changeDate(purchaseOrder.date)
                return result
              }
            throw new Error("PurchaseOrder not found!")
        } catch (error) {
            throw new Error("error when fetching purchaseOrder record!\n"+error)
            
        }
    }


    async findAll(sort: "desc" | "asc", filter: string, limit: number, page: number): Promise<RepositoryFindAllResult<PurchaseOrder>> {
        try {
            const purchaseOrder=await PurchaseOrderModel.findAndCountAll({
            
                order:[["date",sort]],
                limit:limit,
                offset:(page-1)*limit,
                include: [{ model: PurchaseOrderItemModel}]
            })
            const totalElements=purchaseOrder.count
            const totalPages = Math.ceil(totalElements / limit);
            const purchaseOrderResult=purchaseOrder.rows.map((res)=>{
                const purchaseOrderItem=res.items.map((item)=>{
                    return new PurchaseOrderItem(item.id,item.product_id,item.quantity,item.price)
                })
                const result =new PurchaseOrder(res.id,res.customer_id,res.employee_id,purchaseOrderItem);
                result.changeDate(res.date)
                return result
            })

            const findAllResult:RepositoryFindAllResult<PurchaseOrder>={
                entity:purchaseOrderResult,
                current_page:page,
                number_of_elements:totalElements,
                total_page:totalPages
               };

            return findAllResult;

        } catch (error) {
            throw new Error("error when fetching all purchaseOrder record!\n"+error)
            
        }
    }
    
   async updateById(id: string, entity: PurchaseOrder): Promise<void> {
  const transaction: Transaction = await this.sequelize.transaction();

  try {
    const purchaseOrder = await PurchaseOrderModel.findByPk(id, { include: [PurchaseOrderItemModel] });

    if (purchaseOrder) {
      const newItemsData = entity.PurchaseOrderItems.map((item) => ({
        id: item.Id,
        product_id: item.ProductId,
        order_id: purchaseOrder.id,
        quantity: item.Quantity,
        price: item.UnitaryValue,
        total: item.Total,
      }));

      await purchaseOrder.update({
        customer_id: entity.Customer_id,
        employee_id: entity.Employee_id,
        date: entity.Data,
        total: entity.Total,
        discount: entity.Discount,
      }, { transaction });

      await Promise.all(
        purchaseOrder.items.map(async (item) => {
          const newItemData = newItemsData.find((newItem) => newItem.id === item.id);

          if (newItemData) {
            item.id = newItemData.id;
            item.quantity = newItemData.quantity;
            item.product_id = newItemData.product_id;
            item.price = newItemData.price;
            item.total = newItemData.total;
            await item.save({ transaction });
          } else {
            await item.destroy({ transaction });
          }
        })
      );
      await PurchaseOrderItemModel.bulkCreate(
        newItemsData.filter((newItem) => !purchaseOrder.items.some((item) => item.id === newItem.id)),
        { transaction }
      );

      await transaction.commit();
      return;
    }

    throw new Error('Purchase order not found!');
  } catch (error) {
    await transaction.rollback();
    throw new Error(`Error when updating PurchaseOrder record!\n${error}`);
  }
}
   async deleteById(id: string): Promise<void> {
        try {
            await PurchaseOrderModel.destroy({where:{id:id}});
        } catch (error) {
            throw new Error("error when deleting PurchaseOrder record!\n"+error)
            
          }
    }

}