const express=require("express")
const mongoose=require("mongoose")
const movie=require("./Router/movie.router")
const server=express()
function connection(){
   return mongoose.connect("mongodb://127.0.0.1:27017/moviesDatabaes")
}
server.use(express.json())
server.use("/movies",movie)
server.listen(3000,async ()=>{
    await connection()
    console.log("server listning request and server and database connected successfully")
})