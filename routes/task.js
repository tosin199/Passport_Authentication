var express = require('express');
var router = express.Router();
var controller = require('../controller/task');
var passport = require('passport');
const {getData}=require('../controller/task');

router.post('/uploadProfilePicture', passport.authenticate("jwt",{session:false}), controller.uploadProfilePicture );

module.exports = router;