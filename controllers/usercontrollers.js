const passport = require('passport')
const localstrategy = require('passport-local')
const usermodel = require('../models/usermodel')
const commentsmodel = require('../models/commentsmodel')
const blogmodel = require('../models/blogmodel')
const imagekit = require('../utils/imagekit')
passport.use(new localstrategy(usermodel.authenticate()))

exports.homepage = function(req, res, next) {
    res.render('index')
  }

exports.signuppage = (req , res , next ) => { 
    const newuser = new usermodel({
      username : req.body.username , 
      email : req.body.email , 
      fullname : req.body.fullname , 
    }) ; 

    usermodel.register(newuser , req.body.password ).then((u) => { 
      passport.authenticate('local')(req , res , ()=> { 
        res.redirect("/login")
      } )
    })
}
  
exports.signinpage = passport.authenticate('local' , { 
  successRedirect : '/profile' , 
  failureRedirect : '/login'
})

exports.logout = (req , res, next ) => { 
  req.logout(function(err) { 
    if (err){ 
      return next(err)
    }
    res.redirect('/login')
  })
}

exports.creatBlogs = async (req , res, next ) => { 
  const newBlog = new blogmodel({
    title : req.body.title , 
    description : req.body.description , 
    blogImage : req.body.blogImage , 
    createdBy : req.user._id
  })

  await newBlog.save() ; 
  await req.user.blogs.push(newBlog._id)
  await req.user.save() 
  res.redirect('/profile')
}

exports.uploadimg = async(req ,res, next ) => { 
  console.log(req.params.id);
  const user = await usermodel.findById(req.params.id) ; 
  // console.log(user);

  if(!user){ 
    res.send("user not found")
  }

  // console.log(req.files);
  const { fileId , url , thumbnailUrl } = await imagekit.upload({ 
    file : req.files.avatar.data , 
    fileName : req.files.avatar.name  , 
  }); 

  user.profile = url ; 

  await user.save();
  res.render('profile' , {user })
} 

exports.uploadblog = async (req , res , next ) => { 
  const updateblog = await blogmodel.findByIdAndUpdate({_id : req.params.id } , {title : req.body.title , description : req.body.description , blogImage : req.body.blogImage })
  await updateblog.save() ; 
  res.redirect('/profile')
}

exports.comment = async (req , res , next ) => { 
  // console.log(req.body);
  const newcomment = await  new commentsmodel({
    commentText : req.body.comment , 
    postedBy : req.user._id , 
    blogId : req.params.id 
  })
  await newcomment.save() ; 
  const currentblog = await blogmodel.findByIdAndUpdate(req.params.id , { 
    $push : { comments : newcomment._id}
  })
  await currentblog.save()

  res.redirect(`/blogdiscription/${req.params.id}`)
}