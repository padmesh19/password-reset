require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;  
const EMAIL = process.env.EMAIL;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const FRONTEND_URL = process.env.FRONTEND_URL;

module.exports = { MONGO_URI, PORT, EMAIL, EMAIL_PASSWORD, FRONTEND_URL };