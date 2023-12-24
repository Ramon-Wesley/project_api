export default interface useCaseInterface<IN,OUT>{
    execute(input:IN):Promise<OUT>
}