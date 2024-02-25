const mongoose = require('mongoose');
const router = require('express').Router();
const Conversation = mongoose.model('conversations');

const isAlreadyConv = async (senderId, receiverId) => {
    return await Conversation.find({
        '$or': [
          {
            'members': [senderId, receiverId]
          }, 
          {
            'members': [receiverId, senderId]
          }
        ]
    });
};

//create new conversation
router.post('/', async (req, res) => {
    try {
        const isAlready = isAlreadyConv(res.body.senderId, res.body.receiverId);
        if(isAlready.length !== 0) throw new Error("Conversation already existed!");

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
        res.status(500).json(error);
    }
});

router.get('/:senderId/:receiverId', async (req, res) => {
    try {
        const isAlready = await isAlreadyConv(req.params.senderId, req.params.receiverId);
        res.status(200).json(Boolean(isAlready.length));
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;