
const userService = require('./user.service');

const CreateUserController = async (req, res)=>{
    try{
        const payload = req.body;
        const response = await userService.CreateUser({
            name: payload.name,
            email: payload.email,
            password: payload.password
        })
        if (response){
            return res.status(201).json({
                status: 'success',
                message: 'User created successfully',
                data: response
            })
        }   
    }catch(error){
        return res.status(500).json({
            status: 'error',
            message: 'Failed to create user',
            error: error.message
        })

    }
}

module.exports = {
    CreateUserController
}       