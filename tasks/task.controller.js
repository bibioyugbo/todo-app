const taskService = require('./task.service');
const Task = require('./task.model');
const User = require('../users/user.model');

const createTaskController = async (req,res)=>{
    try{
        const payload = req.body;
        const user_id = req.body.user_id || req.user?.id;
        if (!user_id) {
         throw new Error("user_id is required to create a task.");
        }

        const response = await taskService.CreateTask({
            title: payload.title, 
            description: payload.description,
            task_status: payload.task_status?? undefined,
            user_id,
        })

          const user = await User.findById(user_id);
          const tasks = await Task.find({ user_id });

            return res.render('index', {
            message: 'Task created successfully',
            todos: tasks,
            user: {
                id: user._id,
                name: user.name
            },
            selectedStatus: ''
            });
        // if (response){
        //      res.redirect('/api/v1/auth/login')
        //     // return res.status(201).json({
        //     //     status: 'success',
        //     //     message: 'Task created successfully',
        //     //     data: response
        //     // })
        // }
        

    }catch(error){
        return res.status(500).json({
            status: 'error',
            message: 'Failed to create task',
            error: error.message
        })

    }
}


const updateTaskController = async (req, res) => {
    try {
        const taskId = req.params.id;
        const payload = req.body;

        const updatedTask = await taskService.UpdateTask(taskId,{task_status:payload.status } );
        if (!updatedTask) {
            return res.status(404).json({
                status: 'error',
                message: 'Task not found'
            });
        }
        const tasks = await Task.find({ user_id: req.user.id });


         return res.render('index', {
            message: 'Task updated successfully',
            todos: tasks,
            user: {
                id: req.user.id,
                name: req.user.name,
            },
            selectedStatus: ''
            });
        // return res.status(200).json({
        //     status: 'success',
        //     message: 'Task updated successfully',
        //     data: updatedTask
        // });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Failed to update task',
            error: error.message
        });
    }
};
const getTasksController = async (req, res) => {
  try {
    const status = req.query.status;
    const filter = { user_id: req.user.id };

    if (status) {
      filter.task_status = status;
    }

    const tasks = await Task.find(filter);
    const user = await User.findById(req.user.id);

    return res.render('index', {
      todos: tasks,
      user: {
        id: user._id,
        name: user.name
      },
      selectedStatus: status 
    });

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to get tasks',
      error: error.message
    });
  }
}

module.exports={
    createTaskController,
    updateTaskController,
    getTasksController
}