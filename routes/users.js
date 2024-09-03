var express = require('express');
const { homepage, signuppage , signinpage , logout , creatBlogs , uploadimg , uploadblog , comment } = require('../controllers/usercontrollers');
const { isloggedin } = require('../utils/middleware');
var router = express.Router();


/* GET users listing. */
router.get('/', homepage);

router.post('/register' , signuppage); 

router.post('/login' , signinpage); 

router.get('/logout' , logout); 

router.post('/createblogs' , isloggedin , creatBlogs)

router.post('/uploadimg/:id' , isloggedin ,  uploadimg) 

router.post('/updateblog/:id' , isloggedin ,  uploadblog) 

router.post('/comment/:id' ,isloggedin ,  comment ); 


module.exports = router;
