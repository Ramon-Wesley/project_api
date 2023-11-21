import Animal from "./Animal"

describe("test the animal entity",()=>{
    it("correctly enter animal data",()=>{
        const animal={
            id:"123",
            customer_id:"123",
            name:"Ted",
            weight:5.200,
            race_id:"123",
            date_of_birth:new Date("2013/12/12"),
        }
        const result=new Animal(animal.id,animal.customer_id,animal.name,animal.race_id,animal.weight,animal.date_of_birth)
        expect(result.Id).toBe(animal.id);
        expect(result.Customer_id).toBe(animal.customer_id)
        expect(result.Name).toBe(animal.name)
        expect(result.Weight).toBe(animal.weight)
        expect(result.Race_id).toBe(animal.race_id)
        expect(result.Date_of_birth).toBe(animal.date_of_birth)
    })


    it("insert invalid id, client_id and raca_id animal data",()=>{
        const animal={
            id:" ",
            customer_id:" ",
            name:"Ted",
            weight:5.200,
            race_id:" ",
            date_of_birth:new Date("2013/12/12"),
        }
        expect(()=>new Animal(animal.id,animal.customer_id,animal.name,animal.race_id,animal.weight,animal.date_of_birth))
        .toThrow("animal: Invalid animal id!,animal: Invalid customer_id!,animal: Invalid race_id!")
       
    })

    it("insert negative wight animal data",()=>{
        const animal={
            id:"123",
            customer_id:"123",
            name:"Ted",
            weight:-5.200,
            race_id:"123",
            date_of_birth:new Date("2013/12/12"),
        }
        expect(()=>new Animal(animal.id,animal.customer_id,animal.name,animal.race_id,animal.weight,animal.date_of_birth))
        .toThrow("animal: Invalid animal weight!")
       
    })

    it("enter name with less than 2 characters",()=>{
        const animal={
            id:"123",
            customer_id:"123",
            name:"T   ",
            weight:5.200,
            race_id:"123",
            date_of_birth:new Date("2013/12/12"),
        }
        expect(()=>new Animal(animal.id,animal.customer_id,animal.name,animal.race_id,animal.weight,animal.date_of_birth))
        .toThrow("animal: The animal's name must be at least 2 characters long!")
    })

    it("insert all data with invalid values",()=>{
        const animal={
            id:"  ",
            customer_id:"  ",
            name:"T   ",
            weight:-5.200,
            race_id:" ",
            date_of_birth:new Date("1899/12/12"),
        }
        expect(()=>new Animal(animal.id,animal.customer_id,animal.name,animal.race_id,animal.weight,animal.date_of_birth))
        .toThrow("animal: Invalid animal id!,animal: Invalid customer_id!,animal: The animal's name must be at least 2 characters long!,animal: Invalid race_id!,animal: Invalid animal weight!,animal: Older age than supported!")
    })


})