const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    productName:{type:String,required:true,maxlength:[50,'ProductName must not exceed 15 character'], minlength:1},
    price:{type:Number,required:true,min:0},
    category:{type:String,required:true,enum:["Electronics","Clothing","Books","Home Appliances"]},
    stock:{type:Number,required:true,min:0},
    SKU:{type:String,required:true,unique:true,match:[/^PROD-[A-Z0-9]{4}$/, 'Product code must be in the format "PROD-XXXX" where X is an alphanumeric character']},
   
    tags: {
        type: [String], 
        validate: {
          validator: function(array) {
            
            return array.every(function(value) {
              
              return /^[a-zA-Z0-9]+$/.test(value);
            });
          },
          message: 'Tags should contain only alphanumeric characters and should not be empty!'
        }
    }
})

const ProductModel=mongoose.model("products",productSchema)

module.exports=ProductModel