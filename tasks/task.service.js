const Task = require('./task.model');



const CreateTask = async ({ title, description, task_status, user_id })=>{
    let taskData = {
    title, 
    description,
    task_status,
    user_id,
    // created_at,
    // updated_at
}
    try {
         const createTask = await Task.create(taskData)
         return createTask;
    }catch (error) {
        throw new Error('Failed to create task: ' + error.message);
    }

}
const UpdateTask = async (taskId, data) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            data,
            // { task_status: status },
            { new: true }
        );   
    
        return updatedTask;
    } catch (error) {
        throw new Error('Failed to update task: ' + error.message);
    }  
}

module.exports = {
    CreateTask,
    UpdateTask
}