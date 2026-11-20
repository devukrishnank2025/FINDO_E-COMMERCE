const express = require("express");
const { saveUser } = require("../controller/userController");
const userRoute= express()
const upload = require("../multer/multerFile")

userRoute.post('/registration',upload.single("image"), saveUser);

module.exports=userRoute;