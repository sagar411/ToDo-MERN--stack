const express = require("express");
// cluster
const cluster = require("cluster");
const totalCpus = require('os').cpus().length;
const cors = require("cors")

require("dotenv").config();
const connectDataBase = require("./database/db");
const todo_router = require("../src/routes/todo.routes");
const userRoute = require("./routes/users.routes")
const app = express();



if(cluster.isMaster){
    console.log(`Number of cpus are ${totalCpus}`);
    console.log(`Master ${process.pid} is running`);

    // Create a worker threads
    for(let i=0;i<=totalCpus; i++){
        cluster.fork();
    }
    cluster.on("exit",(worker,code, singal)=>{
        console.log(`Worker ${worker.process.pid} died`);
        console.log(`let fork another worker`);
        cluster.fork();

    });
}else{
const PORT = process.env.PORT || 3005;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/rest/todos",todo_router );
app.use("/rest/users",userRoute);

// app.use('/',(req,res)=>{
//     res.status("200").send('<h1>Hello World</h1>');
// })

app.listen(PORT, ()=>{
    connectDataBase();
    console.log(`server listing on poer ${PORT}`)
    
}

)
}