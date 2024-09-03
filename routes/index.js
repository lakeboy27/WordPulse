var express = require('express');
var router = express.Router();
const {indexhomepage , indexlogin ,indexregister , profilepage , createblog , indexblogdescription , updateblog  , deleteblog } = require('../controllers/indexcontrollers')
const { isloggedin} = require('../utils/middleware')



/* GET home page. */
router.get('/',indexhomepage);

router.get('/login', indexlogin);

router.get('/register', indexregister);

router.get('/update/:id',isloggedin ,  updateblog);

router.get('/delete/:id' , isloggedin , deleteblog ); 

router.get('/profile' , isloggedin , profilepage) ; 

router.get('/blogdiscription/:id' , isloggedin ,  indexblogdescription ) ; 

router.get('/createblog' , isloggedin , createblog ) ; 

module.exports = router;
