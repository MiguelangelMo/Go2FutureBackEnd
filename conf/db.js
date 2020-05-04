const mongoose = require("mongoose");

// this library is for you to read the environment variables
require("dotenv").config({ path: "variables.env" });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        console.log("Connected...")
    } catch (error) {
        console.log(error)
        process.exit(1) 
    }
}

module.exports = connectDB;