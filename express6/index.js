const express=require("express")
const server=express()
const mongoose=require("mongoose")
const user=require("./Routers/user.router")
const product=require("./Routers/products.router")
server.use(express.json())
function connection() {
    return mongoose.connect("mongodb://127.0.0.1:27017/eccomers")
}
server.use("/user",user)
server.use("/product",product)
server.listen(3000,async()=>{
     await connection()
     console.log("server running and connection establish")
})