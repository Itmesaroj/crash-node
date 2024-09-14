const mongoose=require("mongoose")
const productSchema=mongoose.Schema({
    title:{type:String,required:true},
    price:{type:Number,required:true},
    des:{type:String,required:true}
})

const ProductModel=mongoose.model("products",productSchema)
module.exports=ProductModel