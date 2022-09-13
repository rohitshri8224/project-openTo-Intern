const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const route=require("./routes/route")

app.use(bodyParser.json());

mongoose.connect(
	"mongodb+srv://Firoz_Shaik_:XaFPzUPEGu5fK1KS@cluster0.dshhzz6.mongodb.net/group44Database-DB",
  {useNewUrlParser:true}
  
).then(()=>{
  console.log("MongoDB is connected")
}).catch((error)=>{console.log(error)})

app.use("/",route)

app.listen(3000,()=>{
console.log("Express app running on server:"+3000)
})
