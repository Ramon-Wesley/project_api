export default interface PurchaseOrderUpdateInDto{
    id:string,
    supplier_id:string,
    employee_id:string,
    date?:Date,
    items:{
       product_id:string,
       quantity:number,
       price:number,
       total:number
    }[],
    discount:number
}