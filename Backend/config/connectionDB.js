const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => {
        console.log("Database connection failed:", err);
    });
}

module.exports = connectDB;