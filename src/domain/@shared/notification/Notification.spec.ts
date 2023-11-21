import Notification from "./Notification"

describe("unit test for notifications",()=>{

        it("should create errors",()=>{
        const notification =new Notification()
        const error={
            context:"customer",
            message:"error message"
        }

        const error2={
            context:"customer",
            message:"error message2"
        }
        notification.insertErrors(error);

        expect(notification.message("customer")).toBe("customer: error message,");

        notification.insertErrors(error2);

        expect(notification.message("customer")).toBe("customer: error message,customer: error message2,");

        })

        it("should create many different context errors",()=>{
            const notification =new Notification()
            const error={
                context:"customer",
                message:"error message"
            }
    
            const error2={
                context:"employee",
                message:"error message2"
            }
            notification.insertErrors(error);
    
            expect(notification.message("customer")).toBe("customer: error message,");
    
            notification.insertErrors(error2);
    
            expect(notification.message("employee")).toBe("employee: error message2,");
    
        })
        it("select all different context errors",()=>{
            const notification =new Notification()
            const error={
                context:"customer",
                message:"error message"
            }
    
            const error2={
                context:"employee",
                message:"error message2"
            }
            notification.insertErrors(error);
    
            expect(notification.message("customer")).toBe("customer: error message,");
    
            notification.insertErrors(error2);
    
            expect(notification.message("employee")).toBe("employee: error message2,");

            expect(notification.message()).toBe("customer: error message,employee: error message2,");
        })
        it("check if there is an error true",()=>{
            const notification =new Notification()
            const error={
                context:"customer",
                message:"error message"
            }
    
            const error2={
                context:"employee",
                message:"error message2"
            }
            notification.insertErrors(error);
            notification.insertErrors(error2);
    
            expect(notification.hasErrors()).toBeTruthy()
            
    

        })

        it("check if there is an error false",()=>{
            const notification =new Notification()
            expect(notification.hasErrors()).toBeFalsy()
        })

    })


