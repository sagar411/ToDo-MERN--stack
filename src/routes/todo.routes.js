const express = require("express");
const router = express.Router();
const { getTodo,
    addTodo,
    updateTodo,
    deleteToDo} = require("../controllers/todos.controller")


router.get("/", getTodo);

router.post("/",addTodo);

router.put("/:id", updateTodo)

router.delete("/:id", deleteToDo)



module.exports= router;