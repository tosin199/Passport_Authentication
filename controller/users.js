const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const passport = require('passport');
const user = require('../models/user');
const multer = require('multer');
const JwtStartegy = require('passport-jwt').Strategy;

async function register(req,res){

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
  
    var data = req.body;
    data.password = hash;
    const user = await models.User.create(
        {
          firstName:data.firstName, 
          lastName:data.lastName,
          email:data.email,
          password:data.password
        }
      );
      return res.json("Account successfully created");
    };
    async function getData(req,res){

        const users = await models.User.findAll();
        res.json(users);
      }
      
      async function getSingleUser(req,res){
      
        const users = await models.User.findOne({where:{id:req.params.id}});
        res.json(users)
      }
      
      async function  login(req,res){
        const data = req.body;
        const email = data.email;
        const password = data.password;
      
        const user = await models.User.findOne(
          {where:{email:email},}//attributes:['firstname','lastname']
          );
        if (user){
          const checkPassword = bcrypt.compareSync(password, user.password);
          if (!checkPassword) {
            return res.json('Incorrect passsword')
          } else {
          const payload ={
            id:user.id,
          }
          const token = jwt.sign(payload,"mySecret");
          return res.json(
            { "token":token,
              "data":user,
              "statusCode":200
            }
            )
          }
        } else {
          return res.json('No account found ')
        }
      }
      
      async function uploadProfilePicture(req,res){
          const upload = multer({
              storage:storage
          }).single("profile_picture");

          upload(req,res, (err)=> {
              if (req.file){
                  res.json("file uploaded")
              }if(err){
                  return res.json(err)
              }
          })
      }
    module.exports= {
        register,
        getData,
        getSingleUser,
        login,
        uploadProfilePicture
    }