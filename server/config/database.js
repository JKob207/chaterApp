const mongoose = require('mongoose');

const DB_URI = `mongodb+srv://aikidox:${process.env.MONGO_PASSWORD}@chater.zlvczl6.mongodb.net/chater`;
const DB_OPTIONS = {
    useNewUrlParser: true
};

const connectDB = async () => {
    try
    {
        const conn = await mongoose.connect(DB_URI, DB_OPTIONS);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(err) {
        console.error(err.message);
    }
}

module.exports = connectDB;