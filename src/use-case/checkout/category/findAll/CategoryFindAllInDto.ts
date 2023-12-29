export default interface CategoryFindAllInDto{
    sort:"desc"|"asc";
    filter:string;
    limit:number;
    page:number
}