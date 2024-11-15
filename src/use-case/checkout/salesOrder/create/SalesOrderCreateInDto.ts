export default interface SalesOrderCreateInDto{
   
                
                 employee_id:string,
                 customer_id:string,
                 date?:Date,
                 items:{
                    product_id:string,
                    quantity:number,
                    price:number,
                    total:number
                 }[],
                 discount:number
}