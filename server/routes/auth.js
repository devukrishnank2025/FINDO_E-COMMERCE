const express = require('express');
const upload = require('../multer/multerFile');
const { saveUser } = require('../controller/userController');


const router = express.Router();

router.post('/register',upload.single("image"),saveUser);
router.post('/login',(req,res)=>{
    res.send("this is the register response")
});


module.exports = router;