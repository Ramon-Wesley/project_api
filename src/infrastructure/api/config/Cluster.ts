import cluster from "cluster";
import { cpus } from "os";

export default class ClusterConfig{

    execute(){
        if(cluster.isPrimary){
            const numWorks=cpus().length
            for(let i=0; i< numWorks;i++){
                cluster.fork()
            }
            cluster.on("online",(worker)=>{
                console.log(worker.process.pid)
            })
            cluster.on("exit",(worker,code,signal)=>{
                console.log(worker.process.pid)
                cluster.fork()
            })
        }
        const events=[""]

    }
}