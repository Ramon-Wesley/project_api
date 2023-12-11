import SchedulingServices from "./SchedulingServices"

describe("test the scheduling service entity",()=>{

    it("correctly enter scheduling service data",()=>{
        const service={
            id:"123",
            name:"service1",
            price:10
        }
        const result=new SchedulingServices(service.id,service.name,service.price)
        expect(result.Id).toBe(service.id)
        expect(result.Name).toBe(service.name)
        expect(result.Price).toBe(service.price)
    })

    it("incorrectly enter scheduling service data",()=>{
        const service={
            id:"   ",
            name:"  ",
            price:-10
        }
        expect(()=>new SchedulingServices(service.id,service.name,service.price))
        .toThrow("schedulingServices: Invalid scheduling services id!,schedulingServices: The schedulingServices name must be at least 2 characters long!,schedulingServices: The price must not be less than zero!")
       
    })

    
})