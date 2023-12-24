import dotenv from "dotenv"
import ExpressConfig from "./express";


export default class ServerExpress{

   static  async execute(){
        dotenv.config();
        const port:number=Number(process.env.PORT) || 3000;
        const app=await ExpressConfig.execute()
        app.listen(port,()=>{
            console.log("Server is listening on port "+port)
        })
    }
}


ServerExpress.execute();