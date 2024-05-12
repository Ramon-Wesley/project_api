export default interface PurchaseOrderCreateInDto{
   
                 customer_id:string,
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