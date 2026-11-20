const userModel = require('../database/models/userModel')
const saveUser = async (req, res) => {
    console.log('i got the call in registration');

    try {
        const user = new userModel({
            name: req.body.name,
             contact: req.body.contact,
            image: req.file.filename
        })
        console.log(user);
        const newResponse= await user.save()
        if(newResponse){
            res.json({ message: "user added successfully", file: user });
        }
    } catch (error) {
        console.log("error from save Product : ", error);
    }
}
module.exports = {
    saveUser
}