const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();

const UserModel = require('./models/user');

const PORT = 3001;
const URI = `mongodb+srv://aikidox:${process.env.MONGO_PASSWORD}@chater.zlvczl6.mongodb.net/chater`;

app.use(express.json());
app.use(cors());

mongoose.connect(URI, {
    useNewUrlParser: true
});

app.post('/addUser', async (req, res) => {
    const user = new UserModel(req.body);

    try {
        await user.save();
        res.send("Inserted data!");
    } catch (error) {
        console.log(error);
    }
});

app.get('/getAllUsers', async (req, res) => {
    try {
        const result = await UserModel.find({}).exec();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

app.put('/updateUser', async (req, res) => {
    try {
        const { id, newUserData } = req.body;
        const result = await UserModel.findByIdAndUpdate(id, newUserData);
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

app.delete('/deleteUser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await UserModel.findByIdAndRemove(id);
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});