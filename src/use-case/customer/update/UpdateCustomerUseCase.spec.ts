import UpdateCustomerUseCase from "./UpdateCustomerUseCase";





const mock=()=>{
    return {
    findById:jest.fn(),
    create:jest.fn(),
    updateById:jest.fn(),
    deleteById:jest.fn(),
    findAll:jest.fn(),
    findByEmail:jest.fn()
}
}
describe("Test the update by id use case customer ", ()=>{

    it("update customer data",async ()=>{
        const usecase=new UpdateCustomerUseCase(mock());
        
        const input={
            id:"123",
            name:"customer1",
            cpf:"640.819.000-60",
            email:"customer@hotmail.com",
        date_of_birth:new Date(),
        address:{
            uf:"mg",
            city:"belo oriente",
            neighborhood:"floresta",
            zipCode:"35170-301",
            street:"magalhaes pinto",
            number:"123",
            description:""
        },
        isActive:true
}
    const result=await usecase.execute(input)
    expect(result).toBeUndefined()

})

it("update customer not found data",async ()=>{
    const customerRepository=mock();
    customerRepository.updateById.mockImplementation(()=>{throw new Error("customer not found!")});
    const usecase=new UpdateCustomerUseCase(customerRepository);
    
    const input={
        id:"1232323",
        name:"customer1",
        cpf:"640.819.000-60",
        email:"customer@hotmail.com",
    date_of_birth:new Date(),
    address:{
        uf:"mg",
        city:"belo oriente",
        neighborhood:"floresta",
        zipCode:"35170-301",
        street:"magalhaes pinto",
        number:"123",
        description:""
    },
    isActive:true
}
expect(async()=>await usecase.execute(input)).rejects.toThrow("customer not found!")

})

})