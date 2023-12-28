const mongoose = require('mongoose');
const router = require('express').Router();
const Conversation = mongoose.model('conversations');

//create new conversation
router.post('/', async (req, res) => {
    try {
        const isAlreadyConv = await Conversation.find({
            $or: [
                {members: [req.body.senderId, req.body.receiverId]},
                {members: [req.body.receiverId, req.body.senderId]}
            ]
        });
        if(isAlreadyConv) throw new Error("Conversation already existed!");

        const newConversation = new Conversation({
            members: [req.body.senderId, req.body.receiverId]
        });

        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (error) {
        res.status(500).json(error);
    }
});

//get conversations of a user
router.get('/:userId', async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId]}
        });
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(err);
    }
});

module.exports = router;