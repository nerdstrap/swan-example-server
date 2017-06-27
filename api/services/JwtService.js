var jwt = require('jsonwebtoken');

module.exports.issueToken = function (payload) {
    return jwt.sign(payload, sails.config.jwt.secret);
};

module.exports.verifyToken = function (token, verified) {
    return jwt.verify(token, sails.config.jwt.secret);
    //return jwt.verify(token, sails.config.jwt.secret, {}, verified);
};
