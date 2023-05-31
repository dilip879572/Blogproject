const express=require('express');
const cors=require('cors');
const PORT=process.env.PORT || 9000;
const app =express();
const Blog =require('./db/Blog');
const Categary = require('./db/Categary');
require('./db/Config');
const User=require('./db/user');
app.use(express.json())
app.use(cors());


app.post('/register', async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject()
    res.send(result);
 
});
//login user 

app.post('/login',async(req,resp)=>{
  if(req.body.password && req.body.email){
    let user = await User.findOne(req.body)
    console.log(user)
    if(user){
      resp.send(user)
    }else{
      resp.send({result:'No data found'})
    }
  }else{
    resp.send({result:'No user Found'})
  }
})

//change user password 
app.get('/show_users',async(req,res)=>{
  let user = await User.find()
  res.send(user)
})
app.post("/show_admin", async (req, resp) => {
  const email = req.body.email;
  if (!email) {
    console.log("invalid email");
    return;
  }

  const user = await User.findOne({ email });
  if (!user) {
    resp.send({ result: "No Records found" });
    return;
  }

  resp.send(user);
});

app.put("/show_admin/:id", async (req, resp) => {
  let id = req.params.id;
  let o_password = req.body.oldPassword;
  const c_password = req.body.newPassword;
  const user = await User.findOne({ _id: id });
  if (!user) {
    resp.send({ error: "Invalid old password" });
    return;
  }
  else if(user.password == o_password){
      await User.updateOne({ _id: id }, { $set: {password: c_password } });
      resp.send({ success: "Password changed successfully" });
  }
  else{
      resp.send('fegrhtyfng');
  } 
});




// blog post........

app.post('/blog',async(req,res)=>{
  let user = new Blog(req.body)
  let result =await user.save()
  result =await result.toObject()
  res.send(result)
})


// blog get data...
app.get('/show_blog',async(req,res)=>{
  let result = await Blog.find();
 
  res.send(result)
})

/// delete the category 
app.delete('/show_blog/:id',async(req,res)=>{
  let result = await Blog.deleteOne({_id:req.params.id})
  res.send(result)
})


// blog get to prifil data

app.get("/show_blog/:id",async(req,res)=>{
  let result = await Blog.findOne({_id:req.params.id})

  if(result)
  {
    res.send(result)
  }else{
    console.log({result:"No Data Found"})
  }
})

//blog  the data update

app.put('/show_blog/:id', async(req,res)=>{
  let result= await Blog.updateOne({_id:req.params.id},{$set:req.body})
  res.send(result)
})

// category Curd.........

app.post('/category',async(req,res)=>{
  let user=new Categary(req.body)
  let result=await user.save()
  result =await result.toObject()
  res.send(result)
})

// category get ................

app.get('/show_category',async(req,res)=>{
  let result = await Categary.find().select('-password');
  res.send (result)
})

/// delete the category 
app.delete('/show_category/:id',async(req,res)=>{
  let result = await Categary.deleteOne({_id:req.params.id})
  res.send(result)
})


// category get to prifil data

app.get("/show_category/:id",async(req,res)=>{
  let result = await Categary.findOne({_id:req.params.id})

  if(result)
  {
    res.send(result)
  }else{
    console.log({result:"No Data Found"})
  }
})

//category the data update

app.put('/show_category/:id', async(req,res)=>{
  let result= await Categary.updateOne({_id:req.params.id},{$set:req.body})
  res.send(result)
})



app.get("/search/:key",async(req,resp)=>
{
  let result = await Categary.find({
    "$or":[
        {category_name:{$regex:req.params.key}},
        {meta_title:{$regex:req.params.key}},
        {meta_keywords:{$regex:req.params.key}},
        {meta_description:{$regex:req.params.key}}
    ]
  })
  resp.send(result)

})
app.listen(PORT,(req,res)=>
{
    console.log('server start');
})