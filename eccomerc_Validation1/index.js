const express=require("express")
const server=express()
const mongoose=require("mongoose")
const product=require("./Router/product.router")
function connection(){
    return mongoose.connect("mongodb://127.0.0.1:27017/eccomerce")
}
server.use(express.json())
server.use("/product",product)
server.listen(3000,async()=>{
     await connection()
    console.log("server listing request dataBase is created successfully")
})