const express = require("express");
const route = express.Router();
const {addTodo,gettodo,remove,update} = require("../controller/todocontrols");
const {auth} = require("../auth/auth")

route.post("/add",auth,addTodo);
route.get("/",auth,gettodo);
route.delete("/del/:id",auth,remove );
route.put("/update/:id",auth,update );


module.exports = route
