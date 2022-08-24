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

    const {email,password}= req.body;
    if(!email || !password){
        res.status(400).json({
            msg:"fill all the credentials"
        })
    }
    try{
        const user = await userModel.findOne({email});
        if(user){
            const passwordCheck = await bcrypt.compare(password, user.password);
            if(passwordCheck){
                res.status(200).json({
                    _id:user.id,
                    name: user.name,
                    email: user.email
                })

            }else{
                res.status(400).json({
                
                    msg:"wrong password"
                })
            }
            
        }else{
            res.status(400).json({
                
                msg:"There is no user with this email"
            })
        }

    }catch(err){
        res.status(400).json({
            msg:"please check required field"
        })

    }
    


    

    
  
}
module.exports ={
    registerUser,
    loginUser
}