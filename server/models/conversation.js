const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    members: {
        type: Array
    }
});

const Conversation = mongoose.model("conversations", ConversationSchema);
module.exports = Conversation