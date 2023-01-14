const express = require("express")
const app = express()
app.use(express.json())

require("dotenv").config()
const cors = require("cors")

const connection = require("./Config/db")

const authrouter = require("./Routes/Login.router")
const studentRouter =require("./Routes/Student.router")


app.use(cors())

app.get("/",(req,res)=>{
    res.send("WELCOME")
})

app.use("/auth",authrouter)
app.use("/student",studentRouter)

app.listen(process.env.PORT, async()=>{

    try {
        await connection;
        console.log("connected to DB")
    } catch (error) {
        console.log("Failed to connect db")
    }
    console.log(`app running on http://localhost:${process.env.PORT}`)
})