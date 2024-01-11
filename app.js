require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const path = require("path");
const app = express();

const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const blogRoute = require("./routes/blog");
const Blog = require("./models/blog")
mongoose.connect(process.env.MONGO_URL).then(()=>{console.log("mongodb connected")});
app.set('view engine','ejs');
app.set('views',path.resolve("./views"));

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use("/user",userRouter);
app.use("/blog",blogRoute);
app.use(express.static(path.resolve("./public")));

app.get("/",async (req,res)=>{
    const allBlogs = await Blog.find({});
    res.render("home",{
        user:req.user,
        blogs: allBlogs,
    });
});
app.listen(PORT,()=> console.log(`server Created at port:${PORT}`));