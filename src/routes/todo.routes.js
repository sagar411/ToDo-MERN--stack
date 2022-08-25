const express = require("express");
const router = express.Router();
const { getTodo,
    addTodo,
    updateTodo,
    deleteToDo} = require("../controllers/todos.controller")
const {privateRoute} = require("../middlewares/authMiddlewares")

router.get("/",privateRoute, getTodo);

router.post("/",privateRoute,addTodo);

router.put("/:id", privateRoute,updateTodo)

router.delete("/:id", privateRoute,deleteToDo)



module.exports= router;