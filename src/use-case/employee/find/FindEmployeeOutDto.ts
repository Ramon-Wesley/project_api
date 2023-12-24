

export default interface FindEmployeeOutDto{
     name:string;
     ra:string;
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