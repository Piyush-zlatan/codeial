const express = require('express');
const router = express.Router();
const passport = require('passport');

const postController = require('../controllers/posts_controller');

//here passport.checkAuthentication this will check if user is signed in or not..if not it won't reach to action in controller
router.post('/create',passport.checkAuthentication,postController.create);

module.exports = router;