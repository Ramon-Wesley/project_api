import { Op, Transaction } from "sequelize";
import RepositoryFindAllResult from "../../../../../../domain/@shared/repository/RepositoryFindAllResult";

import SaleOrder from "../../../../../../domain/checkout/salesOrder/entity/SaleOrder";
import SaleOrderItem from "../../../../../../domain/checkout/salesOrder/saleOrder-item/entity/SaleOrder-item";
import SaleOrderRepositoryInterface from "../../../../../../domain/checkout/salesOrder/repository/SalesOrder.repository";
import { SaleOrderItemModel } from "../model/SaleOrderItemModel";
import { SaleOrderModel } from "../model/SaleOrderModel";
import { Sequelize } from "sequelize-typescript";

export default class SaleOrderRepositorySequelize implements SaleOrderRepositoryInterface{
   
    private sequelize:Sequelize;
    constructor(sequelize:Sequelize){
        this.sequelize=sequelize;
    }
   
    async create(entity: SaleOrder): Promise<void> {
        try {
        await SaleOrderModel.create({
                 id:entity.Id,
                 supplier_id:entity.Supplier_id,
                 employee_id:entity.Employee_id,
                 date:entity.Data,
                 total:entity.Total,
                 items:entity.SaleOrderItems.map((res)=>({
                    id:res.Id,
                    product_id:res.ProductId,
                    order_id:entity.Id,
                    quantity:res.Quantity,
                    price:res.UnitaryValue,
                    total:res.Total
                 })),
                 discount:entity.Discount
            },{include:[SaleOrderItemModel]})
   
        } catch (error) {
        throw new Error("error creating saleOrder record\n"+error);   
        }
        
    }


    async findById(id: string): Promise<SaleOrder> {
        try {
            const saleOrder= await SaleOrderModel.findByPk(id,{include:[SaleOrderItemModel]})
            if(saleOrder){
                const saleOrderItem=saleOrder.items.map((res)=>{
                   return new SaleOrderItem(res.id,res.product_id,res.quantity,res.price);
                })
                const result=new SaleOrder(saleOrder.id,saleOrder.supplier_id,saleOrder.employee_id,saleOrderItem);
                result.changeDate(saleOrder.date)
                return result
              }
            throw new Error("SaleOrder not found!")
        } catch (error) {
            throw new Error("error when fetching saleOrder record!\n"+error)
            
        }
    }


    async findAll(sort: "desc" | "asc", filter: string, limit: number, page: number): Promise<RepositoryFindAllResult<SaleOrder>> {
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
                const result =new SaleOrder(res.id,res.supplier_id,res.employee_id,saleOrderItem);
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
            throw new Error("error when fetching all saleOrder record!\n"+error)
            
        }
    }
    
   async updateById(id: string, entity: SaleOrder): Promise<void> {
  const transaction: Transaction = await this.sequelize.transaction();

  try {
    const saleOrder = await SaleOrderModel.findByPk(id, { include: [SaleOrderItemModel] });

    if (saleOrder) {
      const newItemsData = entity.SaleOrderItems.map((item) => ({
        id: item.Id,
        product_id: item.ProductId,
        order_id: saleOrder.id,
        quantity: item.Quantity,
        price: item.UnitaryValue,
        total: item.Total,
      }));

      await saleOrder.update({
        supplier_id: entity.Supplier_id,
        employee_id: entity.Employee_id,
        date: entity.Data,
        total: entity.Total,
        discount: entity.Discount,
      }, { transaction });

      await Promise.all(
        saleOrder.items.map(async (item) => {
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

      await SaleOrderItemModel.bulkCreate(
        newItemsData.filter((newItem) => !saleOrder.items.some((item) => item.id === newItem.id)),
        { transaction }
      );

      await transaction.commit();
      return;
    }

    throw new Error('Sale order not found!');
  } catch (error) {
    await transaction.rollback();
    throw new Error(`Error when updating SaleOrder record!\n${error}`);
  }
}
   async deleteById(id: string): Promise<void> {
        try {
            await SaleOrderModel.destroy({where:{id:id}});
        } catch (error) {
            throw new Error("error when deleting SaleOrder record!\n"+error)
            
          }
    }

}