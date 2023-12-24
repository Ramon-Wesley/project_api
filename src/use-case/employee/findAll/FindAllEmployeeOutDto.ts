export default interface FindAllEmployeeOutDto{
    entity:{ 
        id:string,
        name:string;
        ra:string;
        email:string;
        date_of_birth:Date;
        address:{
            uf?:string;
            city?:string;
            neighborhood?:string;
            zipCode?:string;
            street?:string;
            number?:string;
            description?:string;
        }
    isActive?:boolean;
} [];
    number_of_elements:number;
    current_page:number;
    total_page:number;
}