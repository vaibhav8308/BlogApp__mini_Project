const express = require("express")
const app = express();
const dotenv =require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts")
const categoryRoute = require("./routes/categories")
const multer = require("multer")
var cors = require('cors');
const path  = require("path");
dotenv.config();

app.use(cors());
app.use(express.json())
app.use("/images", express.static(path.join(__dirname,"/images")))

  mongoose.connect(process.env.MONGO_URL,{
      useNewUrlParser:true,
      useUnifiedTopology:true,
      

  }).then(console.log("connected to Database Successfully")).catch((err)=>console.log(err))

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"images")
  },filename:(req,file,cb)=>{
    cb(null,req.body.name);
  }
})

const upload = multer({storage:storage});
app.post("/backend/upload", upload.single("file"),(req,res)=>{

  res.status(200).json("file has been uploded")
})
app.use("/backend/auth", authRoute);
app.use("/backend/users", userRoute);
app.use("/backend/posts", postRoute);
app.use("/backend/categories", categoryRoute);

app.listen("4000",()=>{
    console.log("server is running.")
    
})