const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs"); 

const registerUser = async(req,res)=>{
    const {name,email,password}= req.body;

    if(!name|| !email|| !password){
        res.status(400).json({
            msg:"please check the required fields"
        })
    }

    try{
        //check if email already exist in database
        const userCheck = await userModel.findOne({email});
        
        if(userCheck){
            res.status(400).json({
                msg:"this email already exist"
            })
        }
        //hash the password 
        const salt = await bcrypt.genSalt(7);
        const hashedPassword = await bcrypt.hash(password,salt);

        //create new user
        const userCreate = await userModel.create({
            name,
            email,
            password:hashedPassword
        });

            if(userCreate){
                res.status(201).json({
                    _id:userCreate.id,
                    name: userCreate.name,
                    email: userCreate.email
                });
            }else(
                res.status(400).json({
                    msg:"Invalid user data"
                })

            )

    }catch(err){
        res.status(400).json({
            msg:err    
        })
    }
}

const loginUser = async (req,res)=>{
    res.status(200).json({
        msg:"Login User"
    })
}
module.exports ={
    registerUser,
    loginUser
}