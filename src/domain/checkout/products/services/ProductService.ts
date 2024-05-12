import Product from "../entity/Product";

export default class ProductService{

    static increasePrice(products:Product[],percent:number){
        const per=percent/100+1
        products.forEach((res)=>{
            res.changePrice(res.Price*per)
        })
    }

    static decreasePrice(products:Product[],percent:number){
        const per=100-percent/100
        products.forEach((res)=>{
            res.changePrice(res.Price*per)
        })
    }

}