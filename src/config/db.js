const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://admin:secret@mongo_db:27017/myshop?directConnection=true&serverSelectionTimeoutMS=2000&authSource=admin&appName=mongosh+2.2.6', {
            useNewUrlParser: true, useUnifiedTopology: true
        });
        console.log(`[server]: MongoDB databases Connected!`)
    } catch(err){
        console.log(err.message);
        process.exit(1)
    }
};

module.exports = connectDB;