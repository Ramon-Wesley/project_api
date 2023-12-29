export default interface CategoryFindAllOutDto{
    entity:{ 
        id:string,
        name:string;
        description:string;
        isActive?:boolean;
} [];
    number_of_elements:number;
    current_page:number;
    total_page:number;
}