 const todoModel = require("../models/todoModel");
const ToDo = require("../models/todoModel");

 const getTodo = async (req,res,next)=>{
    try{
        const todos = await ToDo.find();
        res.status(200).json({todos})
    }catch(error){

        res.status(404).json({
            message:"cannot find todos"
        })

    }
 }

 const addTodo = async(req,res,next)=>{
    const bodyData = req.body.todo;


    if(!bodyData){
        res.status(400).json({msg:"there is no body data"})
    }
    try{
        const todo = await todoModel.create({
            todo:bodyData,
        });
        res.status(200).json({
            res:todo,
            message:"todo added"})
    }catch(error){
        res.status(400).json({msg:"there is problem"})

    }
 
 }
 const updateTodo = async (req,res,next)=>{
    try{
        const todo = await todoModel.findById(req.params.id);
        if(!todo){
            res.status(400).json({
                msg:"there is no todo"
            })
        }
            const updatetodo = await todoModel.findByIdAndUpdate(
                req.params.id,
                 req.body,
            {
                new:true
            });

            res.status(200).json({
                result:updatetodo,
                msg:"updated"
            })
        
       
    }catch(error){
        res.status(404).json({
            msg:"problem in todo"
        })
    }

 }


 const deleteToDo =async (req,res, next)=>{
   try{
    const todotoDeleted = await todoModel.findByIdAndDelete(req.params.id)

    res.status(200).json({
        msg:`deleted ${req.params.id}`
    })

    // await todotoDeleted.remove();
    //     res.status(200).json({
    //         msg:`todo with ${req.params.id} deleted`
    //     });

   }catch(error){

    req.status(400).json({
        msg:"cannot delete todo"
    })
   }
 }

 module.exports = {
    getTodo,
    addTodo,
    updateTodo,
    deleteToDo
 }