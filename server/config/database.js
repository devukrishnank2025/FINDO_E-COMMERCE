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
                maxPoolSize: 10,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
                family: 4
            };

            await mongoose.connect(config.MONGO_URI, options);
            console.log('database connected');
            
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
    console.error('MongoDB connection failed:', error);
    throw error;            // let the server decide to exit
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
    console.log('this worked');
    
    process.exit(0);
});


module.exports = dbConnection;