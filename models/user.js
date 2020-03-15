const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatar');        //path where the image will be stored

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
      cb(null, file.fieldname + '-' + Date.now());
    }
  })

  //static                              //Here we are assigning storage to multer and with single making sure that there should be one file only
  userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar'); 
  //Making avatar path publicaly accessible
  userSchema.statics.avatarPath = AVATAR_PATH;

const user = mongoose.model('user',userSchema);
module.exports = user;