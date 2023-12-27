export default interface FindAllSupplierInDto{
    sort:"desc"|"asc";
    filter:string;
    limit:number;
    page:number
}