var express = require('express');
var router = express.Router();
var controller = require('../controller/users');
var passport = require('passport');
const {getData}=require('../controller/users');

/* GET users listing. */
// router.get('/', async function(req, res, next) {
//   const data = await models.User.findAll();
//   res.send(data);
// });
// router.post('/register', async function(req, res, next) {
//   const data = req.body;
//   await models.User.create(data);
//   res.send('create');
// });
router.post('/register',controller.register);
router.get('/',getData);
router.get('/user', passport.authenticate("jwt",{session:false}), controller.getSingleUser );
router.post('/login', controller.login)
module.exports = router;
