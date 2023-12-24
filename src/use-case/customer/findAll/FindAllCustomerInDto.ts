export default interface FindAllCustomerInDto{
    sort:"desc"|"asc";
    filter:string;
    limit:number;
    page:number
}