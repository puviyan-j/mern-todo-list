const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const userrouter = require("./router/userrouter");
const todorouter = require("./router/todorouter")
const cors = require("cors");
const path = require("path")



mongoose.connect(process.env.db)
    .then(() => { console.log("db connect") })
    .catch(() => { console.log("db not connect") })

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", userrouter)
app.use("/api",todorouter)

app.use(express.static(path.join(__dirname + "/public")));


app.listen(process.env.PORT||5000, () => {
    console.log("PORT RUNNING :", process.env.PORT);
})