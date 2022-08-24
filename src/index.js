const express = require("express");
require("dotenv").config();
const connectDataBase = require("./database/db");
const todo_router = require("../src/routes/todo.routes");
const userRoute = require("./routes/users.routes")
const app = express();

const PORT = process.env.PORT || 3005;
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