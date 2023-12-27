const router = require('express').Router();

router.use('/users', require('./userRoutes'));
router.use('/auth', require('./authRoutes'));
router.use('/conversations', require('./conversationsRoutes'));
router.use('/messages', require('./messagesRoutes'));

module.exports = router;