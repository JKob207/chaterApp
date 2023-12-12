const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('users');
const passport = require('passport');
const utils = require('../utils/passwordUtils');

router.get('/protected', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.status(200).json({success: true, msg: "You are authorized!"});
});

router.post('/login', function(req, res, next){
    User.findOne({ email: req.body.email })
        .then((user) => {
            if(!user) {
                res.status(401).json({success: false, msg: "Could not find user!"});
            }

            const isValid = utils.validPassword(req.body.password, user.hash, user.salt);

            if(isValid)
            {
                const tokenObj = utils.issueJWT(user);
                res.status(200).json({success: true, token: tokenObj.token, expires: tokenObj.expires});
            }else {
                res.status(401).json({success: false, msg: "Wrong password!"});
            }
        })
        .catch(err => {
            next(err);
        });
});

router.post('/register', function(req, res, next) {
    const saltHash = utils.generatePassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        email: req.body.email,
        login: req.body.login,
        hash: hash,
        salt: salt
    });

    newUser.save()
        .then((user) => {
            const jwt = utils.issueJWT(user)

            res.json({success: true, user: user, token: jwt.token, expiresIn: jwt.expires});
        })
        .catch(err => next(err));
});

module.exports = router;