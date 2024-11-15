export default interface ProductFindAllOutDto{
    entity:{ 
        id:string,
        name:string;
        price:number;
        quantity:number;
        category_id:string
        isActive?:boolean;
        version?:number
} [];
    number_of_elements:number;
    current_page:number;
    total_page:number;
}