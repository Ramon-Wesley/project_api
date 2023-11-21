import Entity from "../../../@shared/entity/Entity";
import NotificationError from "../../../@shared/notification/NotificationError";
import SaleOrderFactoryValidator from "../factory/SaleOrder.factory.validator";
import SaleOrderItem from "../saleOrder-item/entity/SaleOrder-item";
import SaleOrderItemFactory from "../saleOrder-item/factory/SaleOrder-item.factory";

export default class SaleOrder extends Entity{

    private supplier_id:string;
    private employee_id:string;
    private data:Date=new Date();
    private total:number=0;
    private saleOrderItems:SaleOrderItem[];
    private discount:number=0;

    constructor(id:string,supplier_id:string,employee_id:string,saleOrderItems:SaleOrderItem[]){
        super(id)
        this.supplier_id=supplier_id;
        this.employee_id=employee_id;
        this.saleOrderItems=saleOrderItems;
        this.total=this.TotalValueSaleOrder();
        this.validate();
       
    }
    validate(){
        SaleOrderFactoryValidator.create().validate(this)
        if(this.notification.hasErrors()){
            throw new NotificationError(this.notification.getErrors())
        }
    }

  private TotalValueSaleOrder(){
 
        const length=this.saleOrderItems.length;
        let sum=0;
        if(length > 0){
            sum=this.saleOrderItems.reduce((prev,current)=>current.Total+prev,0)
            return sum
        }
        return sum;

    }
    changeSupplierId(supplier_id:string){
        this.supplier_id=supplier_id;
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
    changeSaleOrderItems(saleOrderItems:SaleOrderItem[]){
        this.saleOrderItems=saleOrderItems;
        this.validate();
    }

    get Id(){
        return this.id
    }
    get Supplier_id():string{
        return this.supplier_id;
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
    get SaleOrderItems():SaleOrderItem[]{
        return this.saleOrderItems;
    }
    get Discount():number{
        return this.discount
    }


}