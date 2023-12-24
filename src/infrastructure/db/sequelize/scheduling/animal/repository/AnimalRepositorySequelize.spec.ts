import { Op } from "sequelize"
import { Sequelize } from "sequelize-typescript";
import Address from "../../../../../../domain/@shared/object-value/address/Address";
import AnimalRepositorySequelize from "./AnimalRepositorySequelize";
import CustomerFactory from "../../../../../../domain/customer/factory/CustomerFactory";
import CustomerRepositorySequelize from "../../../customer/repository/CustomerRepositorySequelize";
import CustomerModel from "../../../customer/model/CustomerModel";
import AddressModel from "../../../address/model/AddressModel";
import RaceRepositorySequelize from "./RaceRepositorySequelize";
import RaceFactory from "../../../../../../domain/scheduling/animal/factory/Race.factory";
import AnimalFactory from "../../../../../../domain/scheduling/animal/factory/Animal.factory";
import AnimalModel from "../model/AnimalModel";
import SequelizeDb from "../../../config/SequelizeDB";




describe("Test the animal repository", ()=>{
  let sequelize:Sequelize;  

      
   beforeEach(async()=>{ 
    sequelize= await SequelizeDb.getInstance();        
 
     })
 
      afterEach(async()=>{
         await sequelize.close()
         
     })

    it("save animal data correctly",async ()=>{
        const customerRepository= new CustomerRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const customer=CustomerFactory.createWithAddress("animal1","533.408.010-45",
        "customer@hotmail.com",new Date("2000-01-01"),address)
        
        await customerRepository.create(customer);
        
        const raceRepository=new RaceRepositorySequelize()
        const race=RaceFactory.create("race1");

        await raceRepository.create(race)

        const animalRepository=new AnimalRepositorySequelize()
        const date=new Date()
        const animal=AnimalFactory.create(customer.Id,"animal1",race.Id,2,date)

        await animalRepository.create(animal)

        const findAnimal=await AnimalModel.findByPk(animal.Id)

        expect(findAnimal?.id).toBe(animal.Id)
        expect(findAnimal?.name).toBe(animal.Name)
        expect(findAnimal?.customer_id).toBe(animal.Customer_id)
        expect(findAnimal?.race_id).toBe(animal.Race_id)
        expect(findAnimal?.weight).toBe(animal.Weight)
        expect(findAnimal?.date_of_birth.toString()).toBe(animal.Date_of_birth.toString())

    })

    it("update animal data correctly",async ()=>{
        const customerRepository= new CustomerRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const customer=CustomerFactory.createWithAddress("animal1","533.408.010-45",
        "customer@hotmail.com",new Date("2000-01-01"),address)
        
        await customerRepository.create(customer);
        
        const raceRepository=new RaceRepositorySequelize()
        const race=RaceFactory.create("race1");

        await raceRepository.create(race)

        const animalRepository=new AnimalRepositorySequelize()
        const date=new Date()
        const animal=AnimalFactory.create(customer.Id,"animal1",race.Id,2,date)

        await animalRepository.create(animal)

        const findAnimal=await AnimalModel.findByPk(animal.Id)
        animal.changeWeight(5)

        await animalRepository.updateById(animal.Id,animal)
        const findAnimalUpdate=await AnimalModel.findByPk(animal.Id)
        expect(findAnimal?.weight).toBe(2)
        expect(findAnimalUpdate?.weight).toBe(5)
    })
    
   

    it("find animal data by id",async ()=>{
        const customerRepository= new CustomerRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const customer=CustomerFactory.createWithAddress("animal1","533.408.010-45",
        "customer@hotmail.com",new Date("2000-01-01"),address)
        
        await customerRepository.create(customer);
        
        const raceRepository=new RaceRepositorySequelize()
        const race=RaceFactory.create("race1");

        await raceRepository.create(race)

        const animalRepository=new AnimalRepositorySequelize()
        const date=new Date()
        const animal=AnimalFactory.create(customer.Id,"animal1",race.Id,2,date)

        await animalRepository.create(animal)

        const findAnimal=await animalRepository.findById(animal.Id)
        expect(findAnimal).toBeDefined()
        expect(findAnimal?.Id).toBe(animal.Id)
        expect(findAnimal?.Name).toBe(animal.Name)
        expect(findAnimal?.Customer_id).toBe(animal.Customer_id)
        expect(findAnimal?.Race_id).toBe(animal.Race_id)
        expect(findAnimal?.Weight).toBe(animal.Weight)
        expect(findAnimal?.Date_of_birth.toString()).toBe(animal.Date_of_birth.toString())
    })
 
    it("find all animal data ",async ()=>{
        const customerRepository= new CustomerRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const customer=CustomerFactory.createWithAddress("animal1","533.408.010-45",
        "customer@hotmail.com",new Date("2000-01-01"),address)
        
        await customerRepository.create(customer);
        
        const raceRepository=new RaceRepositorySequelize()
        const race=RaceFactory.create("race1");

        await raceRepository.create(race)

        const animalRepository=new AnimalRepositorySequelize()
        const date=new Date()
        const animal=AnimalFactory.create(customer.Id,"animal1",race.Id,2,date)
        const animal2=AnimalFactory.create(customer.Id,"animal2",race.Id,3,date)

        await animalRepository.create(animal)
        await animalRepository.create(animal2)
        
    
        const sort="desc"
        const filter=""
        const limit=7
        const page=1

        const animalModel=await animalRepository.findAll(sort,filter,limit,page)
        
       
        expect(animalModel.entity[1]?.Id).toBe(animal.Id)
        expect(animalModel.entity[1]?.Name).toBe(animal.Name)
        expect(animalModel.entity[1]?.Customer_id).toBe(animal.Customer_id)
        expect(animalModel.entity[1]?.Race_id).toBe(animal.Race_id)
        expect(animalModel.entity[1]?.Weight).toBe(animal.Weight)
        expect(animalModel.entity[1]?.Date_of_birth.toString()).toBe(animal.Date_of_birth.toString())

               
        expect(animalModel.entity[0]?.Id).toBe(animal2.Id)
        expect(animalModel.entity[0]?.Name).toBe(animal2.Name)
        expect(animalModel.entity[0]?.Customer_id).toBe(animal2.Customer_id)
        expect(animalModel.entity[0]?.Race_id).toBe(animal2.Race_id)
        expect(animalModel.entity[0]?.Weight).toBe(animal2.Weight)
        expect(animalModel.entity[0]?.Date_of_birth.toString()).toBe(animal2.Date_of_birth.toString())


        expect(animalModel.current_page).toBe(page)
        expect(animalModel.number_of_elements).toBe(2)
        expect(animalModel.total_page).toBe(1)


})
    it("delete by id animal data",async()=>{
        const customerRepository= new CustomerRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const customer=CustomerFactory.createWithAddress("animal1","533.408.010-45",
        "customer@hotmail.com",new Date("2000-01-01"),address)
        
        await customerRepository.create(customer);
        
        const raceRepository=new RaceRepositorySequelize()
        const race=RaceFactory.create("race1");

        await raceRepository.create(race)

        const animalRepository=new AnimalRepositorySequelize()
        const date=new Date()
        const animal=AnimalFactory.create(customer.Id,"animal1",race.Id,2,date)

        await animalRepository.create(animal)
        await animalRepository.deleteById(animal.Id)

        const animalDeleted=await AnimalModel.findByPk(animal.Id)

        expect(animalDeleted).toBeNull()
        
})

})