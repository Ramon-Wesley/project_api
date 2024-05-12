export default interface ErrorResponseInterface{
  type:string;
  title:string;
  status:number;
  detail:string | string[]  
}