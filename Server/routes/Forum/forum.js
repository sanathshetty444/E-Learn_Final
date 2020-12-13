const router = require('express').Router();
const Posts=require('../../models/Forum/posts')
const Comment=require('../../models/Forum/comment')
const Facultyuser = require('../../models/faculty/FacultyUser.model')
const Studentusers=require('../../models/student/StudentUser.model')
const auth = require('../../middleware/auth')


router.get('/getPosts',async function(req,res){
    let posts =await Posts.find({})
                .populate('user')
                .populate({
                    path:'comments',
                    populate:{
                        path:'user'
                    }
                })
    
    return res.status(200).json({
        posts:posts
    })

})
router.post('/addPosts',auth,async function(req,res){
    let newone;
    let user;
    if(req.body.by=='student')
    {
        user=await Studentusers.findById(req.user)
        newone=await Posts.create({
            content:req.body.post,
            onModel:'StudentUser',
            user:req.user,
            comments:[],
            name:user.name
    
        })
        
    }
    else{
        user=await Facultyuser.findById(req.user)

        newone=await Posts.create({
            content:req.body.post,
            onModel:'FacultyUser',
            user:req.user,
            comments:[],
            name:user.name
    
    
        })
       
    }
    console.log(newone)
   
    
    return res.status(200).json({
        newone:newone
       

    })

})

router.post('/addComment',auth,async function(req,res){
    let newone;
    let user;
    if(req.body.by=='student')
    {
        user=await Studentusers.findById(req.user)
        newone=await Comment.create({
            content:req.body.comm,
            onModel:'StudentUser',
            user:req.user,
            
            name:user.name
    
        })
        
        
    }
    else{
        user=await Facultyuser.findById(req.user)

        newone=await Comment.create({
            content:req.body.comm,
            onModel:'FacultyUser',
            user:req.user,
            
            name:user.name
    
    
    
        })
       
    }
    let commentedPost=await Posts.findById(req.body.id)
    commentedPost.comments.push(newone._id)
    await commentedPost.save()

    let posts=await Posts.find({}).populate('comments')
    
    
    return res.status(200).json({
        posts:posts
       

    })
})
module.exports=router