import Entity from "../../../@shared/entity/Entity";
import NotificationError from "../../../@shared/notification/NotificationError";
import SalesOrderFactoryValidator from "../factory/SalesOrder.factory.validator";
import SalesOrderItem from "../salesOrder-item/entity/SalesOrder-item";
import SalesOrderItemFactory from "../salesOrder-item/factory/SalesOrder-item.factory";
export default class SalesOrder extends Entity{

    private customer_id:string;
    private employee_id:string;
    private data:Date=new Date();
    private total:number=0;
    private salesOrderItems:SalesOrderItem[];
    private discount:number=0;

    constructor(id:string,customer_id:string,employee_id:string,salesOrderItems:SalesOrderItem[]){
        super(id)
        this.customer_id=customer_id;
        this.employee_id=employee_id;
        this.salesOrderItems=salesOrderItems;
        this.total=this.TotalValueSalesOrder();
        this.validate();
       
    }
    validate(){
        SalesOrderFactoryValidator.create().validate(this)
        if(this.notification.hasErrors()){
            throw new NotificationError(this.notification.getErrors())
        }
    }

  private TotalValueSalesOrder(){
 
        const length=this.salesOrderItems.length;
        let sum=0;
        if(length > 0){
            sum=this.salesOrderItems.reduce((prev,current)=>current.Total+prev,0)
            return sum
        }
        return sum;

    }
    changeCustomerId(customer_id:string){
        this.customer_id=customer_id;
        this.validate()
    }
    changeEmployeeId(employee_id:string){
        this.employee_id=employee_id;
        this.validate();
    }
    changeDiscount(discount:number){
        this.discount=discount;
        const percentage=this.discount/100;
        const totalValue=this.TotalValueSalesOrder();
        const discountValue=totalValue*percentage;
        this.total= totalValue-discountValue
        this.validate()
    }
    changeDate(data:Date){
        this.data=data;
        this.validate()
    }
    changeSalesOrderItems(salesOrderItems:SalesOrderItem[]){
        this.salesOrderItems=salesOrderItems;
        this.total=this.TotalValueSalesOrder();
        this.validate();
    }

    get Id(){
        return this.id
    }
    get Customer_id():string{
        return this.customer_id;
    }
    get Employee_id():string{
        return this.employee_id;
    }
    get Data():Date{
        return this.data
    }
    get Total():number{
        return this.total;
    }
    get SalesOrderItems():SalesOrderItem[]{
        return this.salesOrderItems;
    }
    get Discount():number{
        return this.discount
    }


}