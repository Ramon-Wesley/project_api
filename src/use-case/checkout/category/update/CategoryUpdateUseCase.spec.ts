import CategoryUpdateUseCase from "./CategoryUpdateUseCase";

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
describe("Test the update by id use case category ", ()=>{

    it("update category data",async ()=>{
        const usecase=new CategoryUpdateUseCase(mock());
        
        const input={
            id:"123",
            name:"category1",
            description:"",
           isActive:true
}
    const result=await usecase.execute(input)
    expect(result).toBeUndefined()

})


it("mega da virada",()=>{
for(let i=0; i< 6; i++){
console.log(Math.floor(Math.random()*60))
}
})
it("update category not found data",async ()=>{
    const categoryRepository=mock();
    categoryRepository.updateById.mockImplementation(()=>{throw new Error("category not found!")});
    const usecase=new CategoryUpdateUseCase(categoryRepository);
    
    const input={
        id:"1232323",
        name:"category1",  
        description:"",
        isActive:true
}
expect(async()=>await usecase.execute(input)).rejects.toThrow("category not found!")

})

})