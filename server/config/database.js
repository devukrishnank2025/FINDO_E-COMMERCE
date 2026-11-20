const mongoose = require('mongoose');
const config = require('./config');

class DatabaseConnection {

    constructor() {
        this.isConnected = false;
    }

    async connect() {
        try {
            if (this.isConnected) {
                console.log("database is already connected this message from database.js");
                return;
            }

            const options = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                maxPoolSize: 10,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
                family: 4
            };

            await mongoose.connect(config.MONGODB_URI, options);
            this.isConnected = true;

            mongoose.connection.on('error', (err) => {
                this.isConnected = false;
            })
            mongoose.connection.on('disconnected', () => {
                this.isConnected = false;
            });
            mongoose.connection.on('reconnected', () => {
                this.isConnected = true;
            });

        } catch (error) {
            console.log('MongoDB connection failed:', error);
            process.exit(1);

        }
    }


    async disconnect() {
        try {
            await mongoose.connection.close();
            this.isConnected = false;

        } catch (error) {
            console.log('Error during MongoDB disconnect:', error);
        }
    }


    getConnectionStatus() {
        return {
            isConnected: this.isConnected,
            readyState: mongoose.connection.readyState,
            host: mongoose.connection.host,
            port: mongoose.connection.port,
            name: mongoose.connection.name
        };
    }
}


const dbConnection = new DatabaseConnection();


//'SIGINT' uses when we shut down the server

process.on('SIGINT', async () => {
    await dbConnection.disconnect();
    process.exit(0);
});


module.export = dbConnection;