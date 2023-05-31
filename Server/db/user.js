const mongoose=require ('mongoose');

const userSchema = new mongoose.Schema({
    "name":String,
    "email":String,
    "mobile":String,
    "password":String,
    "c_password":String
   

})

module.exports=mongoose.model('students',userSchema,"students");