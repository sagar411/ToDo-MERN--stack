const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

const privateRoute = async (req,res,next)=>{
    let authToken;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //string maniputaion to get only token as it cane with barer

            authToken = req.headers.authorization.split(" ")[1];

            //veryfy the jwt token

            const decodetoken = jwt.verify(authToken,process.env.JWT_SECRET);
            //GET TE USER FORM JWT TOKEN
            req.user = await User.findById(decodetoken.id).select("-password");
            next();

        }catch(error){
            res.status(401).json({messgae:"not authorized"})

        }
    }

    if(!authToken){
        res.status(401).json({msg:"please add token"})
    }
}
module.exports = {
    privateRoute,

}