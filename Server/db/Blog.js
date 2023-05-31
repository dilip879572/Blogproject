const mongoose=require ('mongoose');
const userSchema = new mongoose.Schema({
    "post_title":String,
    "post_content":String,
    "meta_title":String,
    "meta_description":String,
    "meta_keywords":String,
    "date" : String,
    "udate":String,

})
module.exports=mongoose.model('Blog',userSchema);