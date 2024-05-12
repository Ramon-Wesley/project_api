export default interface ProductFindAllInDto{
    sort:"desc"|"asc";
    filter:string;
    limit:number;
    page:number
}