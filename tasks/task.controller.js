const taskService = require('./task.service');


const createTaskController = async (req,res)=>{
    try{
        const payload = req.body;

        const response = await taskService.CreateTask({
            title: payload.title, 
            description: payload.description,
            task_status: payload.task_status,
            user_id: payload.user_id,
        })
        if (response){
            return res.status(201).json({
                status: 'success',
                message: 'Task created successfully',
                data: response
            })
        }

    }catch(error){
        return res.status(500).json({
            status: 'error',
            message: 'Failed to create task',
            error: error.message
        })

    }
}


module.exports={
    createTaskController
}