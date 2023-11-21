import Entity from "../../../@shared/entity/Entity";
import NotificationError from "../../../@shared/notification/NotificationError";
import PurchaseOrderFactoryValidator from "../factory/PurchaseOrder.factory.validator";
import PurchaseOrderItem from "../purchaseOrder-item/entity/PurchaseOrder-item";
import PurchaseOrderItemFactory from "../purchaseOrder-item/factory/PurchaseOrder-item.factory";

export default class PurchaseOrder extends Entity{

    private customer_id:string;
    private employee_id:string;
    private data:Date=new Date();
    private total:number=0;
    private purchaseOrderItems:PurchaseOrderItem[];
    private discount:number=0;

    constructor(id:string,customer_id:string,employee_id:string,purchaseOrderItems:PurchaseOrderItem[]){
        super(id)
        this.customer_id=customer_id;
        this.employee_id=employee_id;
        this.purchaseOrderItems=purchaseOrderItems;
        this.total=this.TotalValuePurchaseOrder();
        this.validate();
       
    }
    validate(){
        PurchaseOrderFactoryValidator.create().validate(this)
        if(this.notification.hasErrors()){
            throw new NotificationError(this.notification.getErrors())
        }
    }

  private TotalValuePurchaseOrder(){
 
        const length=this.purchaseOrderItems.length;
        let sum=0;
        if(length > 0){
            sum=this.purchaseOrderItems.reduce((prev,current)=>current.Total+prev,0)
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
        this.total=this.total*percentage;
        this.validate()
    }
    changeDate(data:Date){
        this.data=data;
        this.validate()
    }
    changePurchaseOrderItems(purchaseOrderItems:PurchaseOrderItem[]){
        this.purchaseOrderItems=purchaseOrderItems;
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
    get PurchaseOrderItems():PurchaseOrderItem[]{
        return this.purchaseOrderItems;
    }
    get Discount():number{
        return this.discount
    }


}