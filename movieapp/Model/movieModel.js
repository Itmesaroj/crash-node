const mongoose=require("mongoose")
const movieSchema=mongoose.Schema({
    title:{type:String,require:true},
    category:{type:String,require:true},
    rating:{type:Number,min:0,max:5},
    releaseDate: {type: Date},
    createdAt: {
        type: Date,
        default: Date.now, 
      },
})


const MovieModel=mongoose.model("movies",movieSchema)

module.exports=MovieModel