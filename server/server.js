const http = require("http");
const express = require("express");
const path = require("path");
const userRoute = require('./routes/userRoute')
const cors = require('cors');
const database = require("./config/database");
const { PORT } = require("./config/config");
const { log } = require("console");


const app = express();


class Server {
    constructor() {

        this.port = PORT;

        this.app = express();

        this.server = http.createServer(this.app);

    }


    async initialise() {
        try {
            await database.connect()

            console.log('server initialised successfully');

        } catch (error) {

            console.log('Server initialization failed:', error);

            process.exit(1);

        }
    }

    async start() {
        await this.initialise();
        this.server.listen(this.port, async () => {
            console.log(`Server running in ${config.NODE_ENV} mode on port ${this.port}`);
        })

        this.setGracefullShutdown()
    }



    setGracefullShutdown() {

        const gracefulShutdown = async () => {

            logger.info(`${signal} received. Starting graceful shutdown...`);

            this.server.close(async () => {

                logger.info('HTTP server closed');

                await dbConnection.disconnect();

                logger.info('Graceful shutdown completed');

                process.exit(0);

            });
        }

        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
        process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    }
}




// app.use(
//   "/ProductImages",
//   express.static(path.join(__dirname, "public", "UserImages"))
// );
// app.use(cors());
// connect();
// app.use("/user", userRoute);

// app.get('/login',(req,res)=>{
//     res.send('this is a temporary server');
// })
// app.listen(3000,(error)=>{
//     if(error) console.log(error);
//     console.log("server is connected");
// }); 

