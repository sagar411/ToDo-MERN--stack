const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Plsease add name"]
        },
        email:{
            type:String,
            required:[true,"Plsease add email"],
            unique:true
        },
        password:{
            type:String,
            required:[true,"please add password"]
        }
    },
    {
        timestamps:true,
    }
    );

    module.exports = mongoose.model("User",userSchema);