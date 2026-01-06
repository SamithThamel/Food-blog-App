const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    ingredients:{
        type:[String],
        required:true
    },
    instructions:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    coverImage:{
        type:String,
        required:false
    },
    videoUrl:{
        type:String,
        required:false
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:false
    }

},{timestamps:true});

module.exports=mongoose.model("Recipe",recipeSchema);