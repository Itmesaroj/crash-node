const mongoose=require("mongoose")
const UserSchema=mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true},
    email:{type:String,required:true,unique:true}
})

const UserModel=mongoose.model("users",UserSchema)

module.exports=UserModel