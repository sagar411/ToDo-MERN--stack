const mongoose = require("mongoose");


const connectDataBase =  async() =>{
    try{
        const connect = await  mongoose.connect(process.env.MONGO_URI);
        console.log(`mongoose connected at ${connect.connection.host} `)

    }catch(error){

        console.log("error  ");
        process.exit(1);
    }
}

module.exports = connectDataBase;