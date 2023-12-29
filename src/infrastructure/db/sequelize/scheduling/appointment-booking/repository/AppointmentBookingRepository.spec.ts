import { Sequelize } from "sequelize-typescript";
import SequelizeDb from "../../../config/SequelizeDB";
import SchedulingFactory from "../../../../../../domain/scheduling/schedulingServices/factory/SchedulingService.factory";
import SchedulingServiceRepository from "../../schedulingServices/repository/SchedulingServiceRepository";
import SchedulingServicesModel from "../../schedulingServices/model/SchedulingServicesModel";
import AppointmentBookingFactory from "../../../../../../domain/scheduling/appointment-booking/factory/AppointmentBooking.factory";
import CustomerRepositorySequelize from "../../../customer/repository/CustomerRepositorySequelize";
import Address from "../../../../../../domain/@shared/object-value/address/Address";
import CustomerFactory from "../../../../../../domain/customer/factory/CustomerFactory";
import EmployeeRepositorySequelize from "../../../employee/repository/EmployeeRepositorySequelize";
import EmployeeFactory from "../../../../../../domain/employee/factory/EmployeeFactory";
import RaceRepositorySequelize from "../../animal/repository/RaceRepositorySequelize";
import RaceFactory from "../../../../../../domain/scheduling/animal/factory/Race.factory";
import AnimalRepositorySequelize from "../../animal/repository/AnimalRepositorySequelize";
import AnimalFactory from "../../../../../../domain/scheduling/animal/factory/Animal.factory";
import AppointmentBookingModel from "../model/AppointmentBookingModel";
import AppointmentBookingRepository from './AppointmentBookingRepository';


describe("Test the scheduling services repository", ()=>{
    let sequelize:Sequelize;  
        
     beforeEach(async()=>{ 
      sequelize= await SequelizeDb.getInstance();       
   
       })
   
        afterEach(async()=>{
           await sequelize.close()
           
       })


       it("save appointmentBooking data correctly",async ()=>{
        const customerRepository= new CustomerRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const customer=CustomerFactory.createWithAddress("customer1","533.408.010-45",
        "customer@hotmail.com",new Date("2000-01-01"),address)

        const employeeRepository= new EmployeeRepositorySequelize();
        const employee=EmployeeFactory.createWithAddress("employee1","12345678",
        "employee@hotmail.com",new Date("2000-01-01"),address)
     
        const raceRepository=new RaceRepositorySequelize()
        const race=RaceFactory.create("race1");
        
        const animalRepository=new AnimalRepositorySequelize()
        const date=new Date()
        const animal=AnimalFactory.create(customer.Id,"animal1",race.Id,2,date)
        
        const schedulingServiceRepository=new SchedulingServiceRepository();
        const schedulingService=SchedulingFactory.create("service1",100);
        
        
        await customerRepository.create(customer);
        await employeeRepository.create(employee);
        await raceRepository.create(race)
        await animalRepository.create(animal)
        await schedulingServiceRepository.create(schedulingService);

   
        const appointmentBookingRepository=new AppointmentBookingRepository(sequelize);
        const appointment=AppointmentBookingFactory.create(customer.Id,employee.Id,animal.Id,date,[schedulingService])
        await appointmentBookingRepository.create(appointment);
        const result=await AppointmentBookingModel.findByPk(appointment.Id,{include:[SchedulingServicesModel]})
      
        expect(result?.id).toBe(appointment.Id)
        expect(result?.customer_id).toBe(customer.Id)
        expect(result?.employee_id).toBe(employee.Id)
        expect(result?.animal_id).toBe(animal.Id)
        expect(result?.date.toString()).toBe(date.toString())
        expect(result?.schedulingServices.length).toBe(1)
        expect(result?.schedulingServices[0].id).toBe(schedulingService.Id)
        expect(result?.schedulingServices[0].name).toBe(schedulingService.Name)
        expect(result?.schedulingServices[0].price).toBe(schedulingService.Price)

    })
 
    it("update appointmentBooking data correctly",async ()=>{
        const customerRepository= new CustomerRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const customer=CustomerFactory.createWithAddress("customer1","533.408.010-45",
        "customer@hotmail.com",new Date("2000-01-01"),address)

        const employeeRepository= new EmployeeRepositorySequelize();
        const employee=EmployeeFactory.createWithAddress("employee1","12345678",
        "employee@hotmail.com",new Date("2000-01-01"),address)
     
        const raceRepository=new RaceRepositorySequelize()
        const race=RaceFactory.create("race1");
        
        const animalRepository=new AnimalRepositorySequelize()
        const date=new Date()
        const animal=AnimalFactory.create(customer.Id,"animal1",race.Id,2,date)
        
        const schedulingServiceRepository=new SchedulingServiceRepository();
        const schedulingService=SchedulingFactory.create("service1",100);
        const schedulingService2=SchedulingFactory.create("service2",100);
        
        
        await customerRepository.create(customer);
        await employeeRepository.create(employee);
        await raceRepository.create(race)
        await animalRepository.create(animal)
        await schedulingServiceRepository.create(schedulingService);
        await schedulingServiceRepository.create(schedulingService2);

   
        const appointmentBookingRepository=new AppointmentBookingRepository(sequelize);
        const appointment=AppointmentBookingFactory.create(customer.Id,employee.Id,animal.Id,date,[schedulingService])
        await appointmentBookingRepository.create(appointment);

        const date2=new Date()
        appointment.changeDate(date2)
        appointment.changeSchedulingServices([schedulingService2])
       
        await appointmentBookingRepository.updateById(appointment.Id,appointment)
        const result=await AppointmentBookingModel.findByPk(appointment.Id,{include:[SchedulingServicesModel]})

        expect(result?.id).toBe(appointment.Id)
        expect(result?.customer_id).toBe(customer.Id)
        expect(result?.employee_id).toBe(employee.Id)
        expect(result?.animal_id).toBe(animal.Id)
        expect(result?.date.toString()).toBe(date2.toString())
        expect(result?.schedulingServices.length).toBe(1)
        expect(result?.schedulingServices[0].id).toBe(schedulingService2.Id)
        expect(result?.schedulingServices[0].name).toBe(schedulingService2.Name)
        expect(result?.schedulingServices[0].price).toBe(schedulingService2.Price)       
    })
    
   

    it("find appointmentBooking data by id",async ()=>{
        const customerRepository= new CustomerRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const customer=CustomerFactory.createWithAddress("customer1","533.408.010-45",
        "customer@hotmail.com",new Date("2000-01-01"),address)

        const employeeRepository= new EmployeeRepositorySequelize();
        const employee=EmployeeFactory.createWithAddress("employee1","12345678",
        "employee@hotmail.com",new Date("2000-01-01"),address)
     
        const raceRepository=new RaceRepositorySequelize()
        const race=RaceFactory.create("race1");
        
        const animalRepository=new AnimalRepositorySequelize()
        const date=new Date()
        const animal=AnimalFactory.create(customer.Id,"animal1",race.Id,2,date)
        
        const schedulingServiceRepository=new SchedulingServiceRepository();
        const schedulingService=SchedulingFactory.create("service1",100);
        
        
        await customerRepository.create(customer);
        await employeeRepository.create(employee);
        await raceRepository.create(race)
        await animalRepository.create(animal)
        await schedulingServiceRepository.create(schedulingService);

   
        const appointmentBookingRepository=new AppointmentBookingRepository(sequelize);
        const appointment=AppointmentBookingFactory.create(customer.Id,employee.Id,animal.Id,date,[schedulingService])
        await appointmentBookingRepository.create(appointment);

        const result=await appointmentBookingRepository.findById(appointment.Id)
        expect(result?.Id).toBe(appointment.Id)
        expect(result?.Customer_id).toBe(customer.Id)
        expect(result?.Employee_id).toBe(employee.Id)
        expect(result?.Animal_id).toBe(animal.Id)
        expect(result?.Date.toString()).toBe(date.toString())
        expect(result?.SchedulingServices.length).toBe(1)
        expect(result?.SchedulingServices[0].Id).toBe(schedulingService.Id)
        expect(result?.SchedulingServices[0].Name).toBe(schedulingService.Name)
        expect(result?.SchedulingServices[0].Price).toBe(schedulingService.Price)


    })
 
    it("find all schedulingService data ",async ()=>{
        const sort="desc"
        const filter=""
        const limit=7
        const page=1
        const customerRepository= new CustomerRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const customer=CustomerFactory.createWithAddress("customer1","533.408.010-45",
        "customer@hotmail.com",new Date("2000-01-01"),address)

        const employeeRepository= new EmployeeRepositorySequelize();
        const employee=EmployeeFactory.createWithAddress("employee1","12345678",
        "employee@hotmail.com",new Date("2000-01-01"),address)
     
        const raceRepository=new RaceRepositorySequelize()
        const race=RaceFactory.create("race1");
        
        const animalRepository=new AnimalRepositorySequelize()
        const date=new Date()
        const date2=new Date()
        const animal=AnimalFactory.create(customer.Id,"animal1",race.Id,2,date)
        
        const schedulingServiceRepository=new SchedulingServiceRepository();
        const schedulingService=SchedulingFactory.create("service1",100);
        
        
        await customerRepository.create(customer);
        await employeeRepository.create(employee);
        await raceRepository.create(race)
        await animalRepository.create(animal)
        await schedulingServiceRepository.create(schedulingService);

   
        const appointmentBookingRepository=new AppointmentBookingRepository(sequelize);
        const appointment=AppointmentBookingFactory.create(customer.Id,employee.Id,animal.Id,date,[schedulingService])
        const appointment2=AppointmentBookingFactory.create(customer.Id,employee.Id,animal.Id,date2,[schedulingService])
        await appointmentBookingRepository.create(appointment);
        await appointmentBookingRepository.create(appointment2)

        const result=await appointmentBookingRepository.findAll(sort,filter,limit,page);
        expect(result.entity[0].Id).toBe(appointment.Id)
        expect(result.entity[0].Customer_id).toBe(customer.Id)
        expect(result.entity[0].Employee_id).toBe(employee.Id)
        expect(result.entity[0].Animal_id).toBe(animal.Id)
        expect(result.entity[0].Date.toString()).toBe(date2.toString())
        expect(result.entity[0].SchedulingServices.length).toBe(1)
        expect(result.entity[0].SchedulingServices[0].Id).toBe(schedulingService.Id)
        expect(result.entity[0].SchedulingServices[0].Name).toBe(schedulingService.Name)
        expect(result.entity[0].SchedulingServices[0].Price).toBe(schedulingService.Price)

        expect(result.entity[1].Id).toBe(appointment2.Id)
        expect(result.entity[1].Customer_id).toBe(customer.Id)
        expect(result.entity[1].Employee_id).toBe(employee.Id)
        expect(result.entity[1].Animal_id).toBe(animal.Id)
        expect(result.entity[1].Date.toString()).toBe(date.toString())
        expect(result.entity[1].SchedulingServices.length).toBe(1)
        expect(result.entity[1].SchedulingServices[0].Id).toBe(schedulingService.Id)
        expect(result.entity[1].SchedulingServices[0].Name).toBe(schedulingService.Name)
        expect(result.entity[1].SchedulingServices[0].Price).toBe(schedulingService.Price)

        
      
})
    it("delete by id schedulingService data",async()=>{
        const customerRepository= new CustomerRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const customer=CustomerFactory.createWithAddress("customer1","533.408.010-45",
        "customer@hotmail.com",new Date("2000-01-01"),address)

        const employeeRepository= new EmployeeRepositorySequelize();
        const employee=EmployeeFactory.createWithAddress("employee1","12345678",
        "employee@hotmail.com",new Date("2000-01-01"),address)
     
        const raceRepository=new RaceRepositorySequelize()
        const race=RaceFactory.create("race1");
        
        const animalRepository=new AnimalRepositorySequelize()
        const date=new Date()
        const animal=AnimalFactory.create(customer.Id,"animal1",race.Id,2,date)
        
        const schedulingServiceRepository=new SchedulingServiceRepository();
        const schedulingService=SchedulingFactory.create("service1",100);
        
        
        await customerRepository.create(customer);
        await employeeRepository.create(employee);
        await raceRepository.create(race)
        await animalRepository.create(animal)
        await schedulingServiceRepository.create(schedulingService);

   
        const appointmentBookingRepository=new AppointmentBookingRepository(sequelize);
        const appointment=AppointmentBookingFactory.create(customer.Id,employee.Id,animal.Id,date,[schedulingService])
        await appointmentBookingRepository.create(appointment);
        await appointmentBookingRepository.deleteById(appointment.Id)
        const result=await AppointmentBookingModel.findByPk(appointment.Id,{include:[SchedulingServicesModel]})
        expect(result).toBeNull()
        
})


    })