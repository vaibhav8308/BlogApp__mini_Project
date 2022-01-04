const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");


const CategorySchema = new mongoose.Schema({
   name:{
     type:String,
     required:true,
   }
    

},{timestamps:true}
);
module.exports = mongoose.model("Category", CategorySchema);