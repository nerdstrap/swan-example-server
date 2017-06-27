"use strict";
/**
 * GetUserController
 *
 * @description :: Server-side logic for get user
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

let JwtService = require('../services/JwtService');

let _example = "example";
let _sample = "sample";

let _sessionId = "_sessionId";
let _transactionId = "_transactionId";
let _deviceTokenCookie = "_deviceTokenCookie";
let _deviceRequest = {
    deviceTokenCookie: _deviceTokenCookie
};

let _fullName = "First Last";
let _emailAddress = "firstlast@companyname.com";
let _userInfo = {
    fullName: _fullName,
    emailAddress: _emailAddress
};

let _success = "Success";
let _challenge = "Challenge";
let _deny = "Deny";

let _verified = "Verified";
let _enrolled = "Enrolled";
let _notEnrolled = "NotEnrolled";
let _unverified = "Unverified";

let _credentialTypes = [
    "challenge-questions",
    "phone-info",
    "email-info",
    "rsa-token"
];

let _phoneInfos = [
    {
        "phoneNumber": "16145551212",
        "label": "phoneInfoLabel1",
        "isDefault": true
    }
];

let _smsInfos = [
    {
        "phoneNumber": "16143239560",
        "label": "smsInfoLabel1",
        "isDefault": true
    }
];

let _emailInfos = [
    {
        "emailAddress": "firstlast@companyname.com",
        "label": "emailInfoLabel1",
        "isDefault": false
    },
    {
        "emailAddress": "firstlast@thirdparty.com",
        "label": "emailInfoLabel2",
        "isDefault": true
    }
];

let _availableChallengeQuestionAnswers = [
    {
        "challengeQuestionId": "Q2.9",
        "challengeQuestionText": "In what city is your vacation home? (Enter full name of city only)"
    },
    {
        "challengeQuestionId": "Q2.5",
        "challengeQuestionText": "What was the name of your first girlfriend/boyfriend?"
    },
    {
        "challengeQuestionId": "Q1.10",
        "challengeQuestionText": "In what city were you married? (Enter full name of city)"
    },
    {
        "challengeQuestionId": "Q3.1",
        "challengeQuestionText": "In what city was your mother born? (Enter full name of city only)"
    },
    {
        "challengeQuestionId": "Q1.1",
        "challengeQuestionText": "In what city was your high school? (full name of city only)"
    }
];

let _challengeQuestionAnswers = [
    {
        "challengeQuestionId": "Q2.9",
        "challengeQuestionText": "In what city is your vacation home? (Enter full name of city only)"
    },
    {
        "challengeQuestionId": "Q2.5",
        "challengeQuestionText": "What was the name of your first girlfriend/boyfriend?"
    },
    {
        "challengeQuestionId": "Q1.10",
        "challengeQuestionText": "In what city were you married? (Enter full name of city)"
    },
    {
        "challengeQuestionId": "Q3.1",
        "challengeQuestionText": "In what city was your mother born? (Enter full name of city only)"
    },
    {
        "challengeQuestionId": "Q1.1",
        "challengeQuestionText": "In what city was your high school? (full name of city only)"
    }
];

function _getToken(userId) {
    let access_token = JwtService.issueToken({username: userId});
    let refresh_token = JwtService.issueToken({username: userId});
    let id_token = JwtService.issueToken({username: userId});

    return {
        access_token: access_token,
        refresh_token: refresh_token,
        id_token: id_token
    };
}

function _getSigninResponse(userId) {
    let userStatus = _verified;
    let authStatusCode = _challenge;
    if (userId === _sample) {
        userStatus = _unverified;
        authStatusCode = _success
    }

    return {
        sessionId: _sessionId,
        transactionId: _transactionId,
        deviceRequest: _deviceRequest,
        userId: userId,
        userStatus: userStatus,
        userInfo: _userInfo,
        authStatusCode: authStatusCode,
        credentialTypes: _credentialTypes,
        success: _success
    };
}

function _getAnalyzeUserResponse(userId) {
    let userStatus = _verified;
    let authStatusCode = _challenge;
    if (userId === _sample) {
        userStatus = _unverified;
        authStatusCode = _success
    }

    return {
        sessionId: _sessionId,
        transactionId: _transactionId,
        deviceRequest: _deviceRequest,
        userId: userId,
        userStatus: userStatus,
        userInfo: _userInfo,
        authStatusCode: authStatusCode,
        credentialTypes: _credentialTypes,
        phoneInfos: _phoneInfos,
        smsInfos: _smsInfos,
        emailInfos: _emailInfos,
        availableChallengeQuestionAnswers: _availableChallengeQuestionAnswers,
        challengeQuestionAnswers: _challengeQuestionAnswers,
        success: _success
    };
}

function _getChallengeUserResponse(userId) {
    let userStatus = _verified;
    let authStatusCode = _success;

    return {
        sessionId: _sessionId,
        transactionId: _transactionId,
        deviceRequest: _deviceRequest,
        userId: userId,
        userStatus: userStatus,
        userInfo: _userInfo,
        authStatusCode: authStatusCode,
        challengeQuestionAnswers: _challengeQuestionAnswers,
        success: _success
    };
}

function _getAuthenticateUserResponse(userId) {
    let userStatus = _verified;
    let authStatusCode = _success;

    return {
        sessionId: _sessionId,
        transactionId: _transactionId,
        deviceRequest: _deviceRequest,
        userId: userId,
        userStatus: userStatus,
        userInfo: _userInfo,
        authStatusCode: authStatusCode,
        success: _success
    };
}

function _getGetUserResponse(userId) {
    let userStatus = _verified;
    let authStatusCode = _challenge;
    if (userId === _sample) {
        userStatus = _unverified;
        authStatusCode = _success
    }

    return {
        sessionId: _sessionId,
        transactionId: _transactionId,
        deviceRequest: _deviceRequest,
        userId: userId,
        userStatus: userStatus,
        userInfo: _userInfo,
        authStatusCode: authStatusCode,
        credentialTypes: _credentialTypes,
        phoneInfos: _phoneInfos,
        smsInfos: _smsInfos,
        emailInfos: _emailInfos,
        availableChallengeQuestionAnswers: _availableChallengeQuestionAnswers,
        challengeQuestionAnswers: _challengeQuestionAnswers,
        success: _success
    };
}

module.exports = {

    signin: function (req, res) {
        let userId = req.param('userId');
        let token = _getToken(userId);
        let response = _getSigninResponse(userId);
        response.access_token = token.access_token;

        res.ok(response);
    },

    analyzePreAuthUser: function (req, res) {
        let decoded = req._sails.services.jwtservice.verifyToken(req.param('access_token'));
        if (decoded) {
            let userId = req.param('userId');
            let token = _getToken(userId);
            let response = _getAnalyzeUserResponse(userId);
            response.access_token = token.access_token;

            res.ok(response);
        } else {
            res.serverError('invalid_token');
        }
    },

    analyzeUser: function (req, res) {
        let decoded = req._sails.services.jwtservice.verifyToken(req.param('access_token'));
        if (decoded) {
            let userId = req.param('userId');
            let token = _getToken(userId);
            let response = _getAnalyzeUserResponse(userId);
            response.access_token = token.access_token;

            res.ok(response);
        } else {
            res.serverError('invalid_token');
        }
    },

    challengePreAuthUser: function (req, res) {
        let decoded = req._sails.services.jwtservice.verifyToken(req.param('access_token'));
        if (decoded) {
            let userId = req.param('userId');
            let token = _getToken(userId);
            let response = _getChallengeUserResponse(userId);
            response.access_token = token.access_token;

            res.ok(response);
        } else {
            res.serverError('invalid_token');
        }
    },

    challengeUser: function (req, res) {
        let userId = req.param('userId');
        let token = _getToken(userId);
        let response = _getChallengeUserResponse(userId);
        response.access_token = token.access_token;

        res.ok(response);
    },

    authenticatePreAuthUser: function (req, res) {
        let decoded = req._sails.services.jwtservice.verifyToken(req.param('access_token'));
        if (decoded) {
            let userId = req.param('userId');
            let token = _getToken(userId);
            let response = _getAuthenticateUserResponse(userId);
            response.access_token = token.access_token;

            res.ok(response);
        } else {
            res.serverError('invalid_token');
        }
    },

    authenticateUser: function (req, res) {
        let userId = req.param('userId');
        let token = _getToken(userId);
        let response = _getAuthenticateUserResponse(userId);
        response.token = token;

        res.ok(response);
    },

    getPreAuthUser: function (req, res) {
        let decoded = req._sails.services.jwtservice.verifyToken(req.param('access_token'));
        if (decoded) {
            let userId = req.param('userId');
            let token = _getToken(userId);
            let response = _getGetUserResponse(userId);
            response.access_token = token.access_token;

            res.ok(response);
        } else {
            res.serverError('invalid_token');
        }
    },

    getUser: function (req, res) {
        let userId = req.param('userId');
        let response = _getGetUserResponse(userId);

        res.ok(response);
    },

    addChallengeQuestionAnswers: function (req, res) {
        let userId = req.param('userId');
        let response = _getGetUserResponse(userId);

        res.ok(response);
    },

    verifyContactInfo: function (req, res) {
        let userId = req.param('userId');
        let response = _getGetUserResponse(userId);

        res.ok(response);
    },

    removeContactInfo: function (req, res) {
        let userId = req.param('userId');
        let response = _getGetUserResponse(userId);

        res.ok(response);
    },

    bindDevice: function (req, res) {
        let userId = req.param('userId');
        let response = _getGetUserResponse(userId);

        res.ok(response);
    },

    updateCredentials: function (req, res) {
        let userId = req.param('userId');
        let response = _getGetUserResponse(userId);

        res.ok(response);
    },

    unlockUser: function (req, res) {
        let userId = req.param('userId');
        let response = _getGetUserResponse(userId);

        res.ok(response);
    }
};
