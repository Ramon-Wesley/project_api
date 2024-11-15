export interface SalesOrderFindAllOutDto {
    entity:{ 
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
} [];
    number_of_elements:number;
    current_page:number;
    total_page:number;
}