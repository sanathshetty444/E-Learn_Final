const mongoose=require('mongoose');
const posts=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        refPath: 'onModel'

    },
    name:{
        type:String,
        
    },
    onModel: {
        type: String,
        required: true,
        enum: ['StudentUser', 'FacultyUser']
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ]
},{
    timestamps:true
});
const Posts=mongoose.model('Posts',posts);
module.exports=Posts;