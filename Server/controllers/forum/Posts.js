const Comment = require('../../models/Forum/comment');
const Student=require('../../models/student/StudentUser.model');
const Faculty=require('../../models/faculty/FacultyUser.model')
const Posts=require('../../models/Forum/comment');
const Likes=require('../../models/Forum/comment');

module.exports.addposts= async function(req,res){
    try
    {
        let post=  await Posts.create({
         content:req.body.posts,
         user:req.user._id
        
         });
        let user= await User.findById(req.user.id);
        console.log(user.name);
 
        
         if (req.xhr){
             return res.status(200).json({
                 data: {
                     post: post,
                     user:user.name
                 },
                 message: "Post created!"
             });
         }
         
 
         req.flash('success','Post added successfully');
 
         res.redirect('/');
    }
    catch(err){
     console.log("error in creating post",err);
     return res.redirect('back')
    }
 }

// module.exports.addposts=async function(req,res){
//     try{
//         if(req.body.onModel=='student'){
//             let student=await Student.findById(req.body.id)
//         }
//     }
// }