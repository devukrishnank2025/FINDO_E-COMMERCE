module.exports = {
    PORT: 5000,

    MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/miniEcommerce',

    NODE_ENV: process.env.NODE_ENV || 'development',

    RATE_LIMIT: {
        WINDOW_MS: 15 * 60 * 1000,
        MAX_REQUESTS: 100,
        AUTH_MAX_REQUESTS: 5
    },


    CORS: {
        ORIGIN: process.env.FRONTEND_URL || 'http://localhost:3000',
        CREDENTIALS: true,
        METHODS: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        ALLOWED_HEADERS: ['Content-Type', 'Authorization', 'X-Requested-With']
    },
    PAGINATION: {
        DEFAULT_LIMIT: 10,
        MAX_LIMIT: 100
    },

    JWT: {
        USER_SECRET: process.env.JWT_USER_SECRET || 'your_super_secret_user_jwt_key',
        ADMIN_SECRET: process.env.JWT_ADMIN_SECRET || 'your_super_secret_admin_jwt_key',
        EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
        REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '30d'
    },
}


