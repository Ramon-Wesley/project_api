import AnimalFactory from "./Animal.factory"



describe("Test AnimalFactory", () => {

    it("creates a new Animal",()=>
    {
      const date=new Date()
      const animal=AnimalFactory.create("1","animal1","1",2,date)
      expect(animal.Id).toBeDefined()
      expect(animal.Customer_id).toBe("1")
      expect(animal.Date_of_birth).toBe(date)
      expect(animal.Name).toBe("animal1")
      expect(animal.Weight).toBe(2)
      expect(animal.Race_id).toBe("1")
    }
    )
})