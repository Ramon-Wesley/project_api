export interface PurchaseOrderFindAllInDto{
    sort:"desc"|"asc";
    filter:string;
    limit:number;
    page:number
}