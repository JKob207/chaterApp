const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const pathToKey = path.join(__dirname, "../crypto/id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

const generatePassword = (password) => {
    const salt = crypto.randomBytes(32).toString('hex');
    const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt: salt,
        hash: genHash
    };
};

const validPassword = (password, hash, salt) => {
    const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
};

const issueJWT = (user) => {
    const _id = user._id;
    const expiresIn = '1d';

    const payload = {
        sub: _id,
        iat: Date.now()
    };

    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {expiresIn: expiresIn, algorithm: 'RS256'});

    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }
}

module.exports.validPassword = validPassword;
module.exports.generatePassword = generatePassword;
module.exports.issueJWT = issueJWT;