const mongoose=require('mongoose');
const comment=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        refPath: 'onModel'

    },
    onModel: {
        type: String,
        required: true,
        enum: ['StudentUser', 'FacultyUser']
    },
    
    
    name:{
        type:String,
    }
},{
    timestamps:true
});
const Comment=mongoose.model('Comment',comment); 
module.exports=Comment; 