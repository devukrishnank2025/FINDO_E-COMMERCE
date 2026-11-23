const config = require('../config/config');


const setupRoutes = (app) => { 

    app.use('/api/auth', (req,res)=>{

        res.send("this is the server");

    });
};

module.exports = {
    setupRoutes
};