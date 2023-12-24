import RaceFactory from "./Race.factory"



describe("Test RaceFactory", () => {

    it("creates a new Race",()=>
    {
      const animal=RaceFactory.create("raca1")
      expect(animal.Id).toBeDefined()
      expect(animal.Name).toBe("raca1")
    }
    )
})