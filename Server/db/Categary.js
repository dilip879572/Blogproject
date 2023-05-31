const mongoose=require ('mongoose');
const userSchema = new mongoose.Schema({
    "category_name":String,
    "meta_title":String,
    "meta_description":String,
    "meta_keywords":String

})
module.exports=mongoose.model('data',userSchema);