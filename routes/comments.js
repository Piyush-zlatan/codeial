const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentsController = require('../controllers/comments_controller');

//here passport.checkAuthentication this will check if user is signed in or not..if not it won't reach to action in controller
router.post('/create',passport.checkAuthentication,commentsController.create);

router.get('/destroy/:id',passport.checkAuthentication,commentsController.destroy);

module.exports = router;