const express=require("express");
const path=require("path");
const { upload } = require("../multer");
 
const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../model/user");
 
const router=express.Router();
 


router.post("/create-user",upload.single("file"),async(req,res)=>{
    const {name,email,password}=req.body;
    const userEmail=await User.findOne({email}) 

    if (userEmail) {
        const filename=req.file.filename;
        const filePath=path.join(filename);
        fs.unlink(filePath,(err)=>{
            if (err) {
                console.log(err);
                res.status(500).json({message:"Error Deleting File"})
            }
            else{
                res.json({message:"File delete successfully"})
            }
         
        })
        return next(new ErrorHandler("User already exists",400));
    }

    const filename=req.file.filename;
    const fileUrl=path.join(filename);
    
    const user={
        name:name,
        email:email,
        password:password,
        avatar:fileUrl,
    }
    console.log(user);

    const newUser=await User.create(user);
    res.status(201).json({
        success:true,
        newUser
    })

    
    

    
})


module.exports=router;