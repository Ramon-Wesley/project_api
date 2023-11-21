import SchedulingZodValidator from "../validator/SchedulingService.zod";

export default class SchedulingServiceValidator{

    public static create(){
        return new SchedulingZodValidator()
    }
}