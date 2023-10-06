const express = require('express');
const mongoose = require('mongoose');
const app = express();

const UserModel = require('./models/user');

const PORT = 3001;
const URI = `mongodb+srv://aikidox:${import.meta.env.VITE_MONGO_PASSWORD}@chater.zlvczl6.mongodb.net/chater`;

app.use(express.json());

mongoose.connect(URI, {
    useNewUrlParser: true
});

app.get('/', async (req, res) => {
    const user = new UserModel({
        email: "test@gmail.com",
        login: "test",
        password: "zaq1@WSX"
    });

    try {
        await user.save();
        res.send("Inserted data!");
    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});