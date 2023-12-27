import UpdateEmployeeUseCase from "./UpdateEmployeeUseCase";

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
describe("Test the update by id use case employee ", ()=>{

    it("update employee data",async ()=>{
        const usecase=new UpdateEmployeeUseCase(mock());
        
        const input={
            id:"123",
            name:"employee1",
            ra:"64081900",
            email:"employee@hotmail.com",
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

it("update employee not found data",async ()=>{
    const employeeRepository=mock();
    employeeRepository.updateById.mockImplementation(()=>{throw new Error("employee not found!")});
    const usecase=new UpdateEmployeeUseCase(employeeRepository);
    
    const input={
        id:"1232323",
        name:"employee1",
        ra:"64081900",
        email:"employee@hotmail.com",
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
expect(async()=>await usecase.execute(input)).rejects.toThrow("employee not found!")

})

})