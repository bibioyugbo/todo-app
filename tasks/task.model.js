const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,  
    },
    description:{
        type:String,
        required:true,  
    },
    task_status:{
        type: String,
        enum: ['pending', 'deleted', 'completed'],
        default: 'pending',
        // required:true,  
    },
   user_id: {
    type: mongoose.Schema.Types.ObjectId, // Tells Mongoose it's a reference
    ref: 'User',                          //Links to the User model
    required: true
  },
},
  {timestamps: true }
)

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;          