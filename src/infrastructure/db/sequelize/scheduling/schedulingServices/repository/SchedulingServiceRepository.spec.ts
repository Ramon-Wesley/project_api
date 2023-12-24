import { Sequelize } from "sequelize-typescript";
import SequelizeDb from "../../../config/SequelizeDB";
import SchedulingFactory from "../../../../../../domain/scheduling/schedulingServices/factory/SchedulingService.factory";
import SchedulingServicesModel from "../model/SchedulingServicesModel";
import SchedulingServiceRepository from "./SchedulingServiceRepository";

describe("Test the scheduling services repository", ()=>{
    let sequelize:Sequelize;  
        
     beforeEach(async()=>{ 
      sequelize= await SequelizeDb.getInstance();       
   
       })
   
        afterEach(async()=>{
           await sequelize.close()
           
       })


       it("save schedulingService data correctly",async ()=>{
        const schedulingServiceRepository=new SchedulingServiceRepository();
        const schedulingService=SchedulingFactory.create("service1",100);
        await schedulingServiceRepository.create(schedulingService);
        const result=await SchedulingServicesModel.findByPk(schedulingService.Id);
        expect(result?.id).toBe(schedulingService.Id);
        expect(result?.name).toBe(schedulingService.Name);
        expect(result?.price).toBe(schedulingService.Price);
    })


    it("save schedulingService data with duplicate name ",async ()=>{
        const schedulingServiceRepository=new SchedulingServiceRepository();
        const schedulingService=SchedulingFactory.create("service1",100);
        const schedulingService2=SchedulingFactory.create("service1",200);
        await schedulingServiceRepository.create(schedulingService);
        expect(async()=>await schedulingServiceRepository.create(schedulingService2)).rejects.toThrow()
    })
    

    it("update schedulingService data correctly",async ()=>{
        const schedulingServiceRepository=new SchedulingServiceRepository();
        const schedulingService=SchedulingFactory.create("service1",100);
        await schedulingServiceRepository.create(schedulingService);
        schedulingService.changeName("service2")
        schedulingService.changePrice(200)
        await schedulingServiceRepository.updateById(schedulingService.Id,schedulingService)
        const result=await SchedulingServicesModel.findByPk(schedulingService.Id);
        expect(result?.id).toBe(schedulingService.Id);
        expect(result?.name).toBe("service2");
        expect(result?.price).toBe(200);
    })
    
   

    it("find schedulingService data by id",async ()=>{
        const schedulingServiceRepository=new SchedulingServiceRepository();
        const schedulingService=SchedulingFactory.create("service1",100);
        await schedulingServiceRepository.create(schedulingService);
        const result=await schedulingServiceRepository.findById(schedulingService.Id);
        expect(result?.Id).toBe(schedulingService.Id);
        expect(result?.Name).toBe(schedulingService.Name);
        expect(result?.Price).toBe(schedulingService.Price);


    })
 
    it("find all schedulingService data ",async ()=>{
        const sort="desc"
        const filter=""
        const limit=7
        const page=1
        const schedulingServiceRepository=new SchedulingServiceRepository();
        const schedulingService=SchedulingFactory.create("service1",100);
        const schedulingService2=SchedulingFactory.create("service2",200);
        await schedulingServiceRepository.create(schedulingService);
        await schedulingServiceRepository.create(schedulingService2);
        const result =await schedulingServiceRepository.findAll(sort,filter,limit,page)
        expect(result.entity[0]?.Id).toBe(schedulingService2.Id);
        expect(result.entity[0]?.Name).toBe(schedulingService2.Name);
        expect(result.entity[0]?.Price).toBe(schedulingService2.Price);
        expect(result.entity[1]?.Id).toBe(schedulingService.Id);
        expect(result.entity[1]?.Name).toBe(schedulingService.Name);
        expect(result.entity[1]?.Price).toBe(schedulingService.Price);
        expect(result.current_page).toBe(page)
        expect(result.number_of_elements).toBe(2)
        expect(result.total_page).toBe(1)
      
})
    it("delete by id schedulingService data",async()=>{
        const schedulingServiceRepository=new SchedulingServiceRepository();
        const schedulingService=SchedulingFactory.create("service1",100);
        await schedulingServiceRepository.create(schedulingService);
        await schedulingServiceRepository.deleteById(schedulingService.Id)
        const result=await SchedulingServicesModel.findByPk(schedulingService.Id);
        expect(result).toBeNull()
        
})


    })