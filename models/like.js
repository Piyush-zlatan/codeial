const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.ObjectId,

    },
    //this defines the object id of liked object 
    likeable:{
        type:mongoose.Schema.ObjectId,
        required:true,
        refPath: 'onModel'                  //Likeable is ref to onModel ..which tell it ref to which model
    },
    // this is used to define the type of liked object since it is dynamic object
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']                                          //Here we are difinign that likeable
    }                                                                    //can be a post or comment

},{
    timestamps:true
}
)

const Like  = mongoose.model('Like',likeSchema);
module.exports  = Like; 