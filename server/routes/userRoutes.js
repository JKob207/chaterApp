const router = require('express').Router();
const UserModel = require('../models/user');

router.post('/addUser', async (req, res) => {
    const user = new UserModel(req.body);
    try {
        await user.save();
        res.send("Inserted data!");
    } catch (error) {
        console.log(error);
    }
});

router.get('/getAllUsers', async (req, res) => {
    try {
        const result = await UserModel.find({}).exec();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

router.put('/updateUser', async (req, res) => {
    try {
        const { id, newUserData } = req.body;
        const result = await UserModel.findByIdAndUpdate(id, newUserData);
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

router.delete('/deleteUser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await UserModel.findByIdAndRemove(id);
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;