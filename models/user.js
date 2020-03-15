const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');        //path where the image will be stored

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type:String,
        required: true
    },

    name:{
        type:   String,
        required: true
    },
    avatar:{
        type: String
    }
},{
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

const user = mongoose.model('user',userSchema);
module.exports = user;