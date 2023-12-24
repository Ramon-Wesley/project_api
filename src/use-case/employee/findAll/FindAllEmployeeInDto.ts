export default interface FindAllEmployeeInDto{
    sort:"desc"|"asc";
    filter:string;
    limit:number;
    page:number
}