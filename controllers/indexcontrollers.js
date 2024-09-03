const blogmodel = require('../models/blogmodel');
const usermodel = require('../models/usermodel');

exports.indexhomepage  =  async  function(req, res, next) {

  const allblogs = await blogmodel.find() ; 
  // console.log(allblogs);
    res.render('index', {  allblogs  });
  }

exports.indexlogin = function(req, res, next) {
    res.render('login');
  }

exports.indexregister =  function(req, res, next) {
    res.render('register');
  }

exports.profilepage =async function(req , res , next ) { 
  // console.log(req.user);
  const user = await usermodel.findById(req.user._id).populate('blogs')
    res.render('profile' , {user })
}

exports.createblog = function(req , res , next ) { 
  // console.log(req.user);
    res.render('createblog')
}

exports.indexblogdescription = async (req ,res , next ) => { 
  const blogdescription = await blogmodel.findById(req.params.id).populate({path : "comments" , populate : { path  : "postedBy" , model : "user"}}).exec(); 
  // console.log(blogdescription);
  res.render("blogdescription" , {blogdescription})
}

exports.updateblog = async(req , res, next ) =>  { 
  const currentblog = await blogmodel.findById(req.params.id); 
  res.render("update" , { currentblog})
}

exports.deleteblog = async (req , res , next ) => { 
  await blogmodel.findByIdAndDelete(req.params.id) ; 
  res.redirect('/profile') ; 
}