import Address from "../../../domain/@shared/object-value/address/Address";

export default interface FindCustomerOutDto{
     name:string;
     cpf:string;
     email:string;
     date_of_birth:Date;
     address:{
         uf:string;
         city:string;
         neighborhood:string;
         zipCode:string;
         street:string;
         number:string;
         description:string;
     };
     isActive:boolean;
}