export interface SalesOrderFindAllInDto{
    sort:"desc"|"asc";
    filter:string;
    limit:number;
    page:number
}