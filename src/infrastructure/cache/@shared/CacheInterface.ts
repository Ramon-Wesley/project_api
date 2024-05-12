export default interface CacheInterface{
    insertValue(key:string,value:string,time:number):Promise<void>

    getValue(key:string):Promise<string|null>
}