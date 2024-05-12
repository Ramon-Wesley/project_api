
export default interface TransactionInterface{
    commit():Promise<void>
    roolback():Promise<void>

}