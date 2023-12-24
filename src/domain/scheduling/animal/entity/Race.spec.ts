import Race from "./Race"

describe("test the race entity",()=>{
    it("correctly enter race data",()=>{
        const race={
            id:"123",
            name:"Cachorro",
           
        }
        const result=new Race(race.id,race.name)
        expect(result.Id).toBe(race.id);
        expect(result.Name).toBe(race.name)
    
    })
  
    it("enter name with less than 2 characters",()=>{
        const race={
            id:"123",
            name:"T   ",
        }
        expect(()=>new Race(race.id,race.name))
        .toThrow("race: The race's name must be at least 2 characters long!")
    })

    it("insert all data with invalid values",()=>{
        const race={
            id:"  ",
            name:"T   ",
        }
        expect(()=>new Race(race.id,race.name))
        .toThrow("race: Invalid race id!,race: The race's name must be at least 2 characters long!")
    })


})