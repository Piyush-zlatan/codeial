const express = require('express');

const router = express.Router();
const homeController  = require('../controllers/home_controller');

console.log('runnnint');

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));

//for any further router, access from here
//router.use('/routerName',require('./routerfile'))


module.exports = router;