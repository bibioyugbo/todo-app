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
        required:true,  
    },
    user_id:{
        type:String,
        required:true,  
    },
},
  {timestamps: true }
)

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;          