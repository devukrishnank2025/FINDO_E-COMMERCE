const http = require("http");
const express = require("express");
const path = require("path");
const userRoute = require('./routes/auth')
const cors = require('cors');
const database = require("./config/database");
const { PORT } = require("./config/config");
const { log } = require("console");
const { setupRoutes } = require("./routes");
const { setupMiddleware } = require("./middlewares/setup");


class Server {
    constructor() {

        this.port = PORT;

        this.app = express();

        this.server = http.createServer(this.app);
        console.log('constructor worked');
        
    }

    async initialise() {
        try {
            await database.connect();

            setupMiddleware(this.app)
            
            setupRoutes(this.app);

            console.log('server initialised successfully');

        } catch (error) {

            console.log('Server initialization failed:', error);

            process.exit(1);

        }
    }

    async start() {
        await this.initialise();
        this.server.listen(this.port, async () => {
            console.log(`Server running in ${PORT} mode on port ${this.port}`);
        })

        this.setGracefullShutdown()
    }

    setGracefullShutdown(signal) {

        const gracefulShutdown = async () => {

            console.log(`${signal} received. Starting graceful shutdown...`);

            this.server.close(async () => {

                console.log('HTTP server closed');

                await dbConnection.disconnect();

                console.log('Graceful shutdown completed');

                process.exit(0);
            });
        }
        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
        process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    }
}


        const appServer = new Server();
        appServer.start();




// const app = express()

// app.use(
//   "/ProductImages",
//   express.static(path.join(__dirname, "public", "UserImages"))
// );
// app.use(cors());


//      database.connect();
     



// app.use("/user", userRoute);

// app.get('/login',(req,res)=>{
//     res.send('this is a temporary server');
// })
// app.listen(5000,(error)=>{
//     if(error) console.log(error);
//     console.log("server is connected");
// }); 


