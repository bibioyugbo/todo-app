const User = require('./user.model')

const CreateUser = async({name, email, password})=>{

    const userData ={
        name,
        email,
        password    
    }

    try{
        const createUser = await User.create(userData)
        return createUser;
    }
    catch(error){
        throw new Error('Failed to create user: ' + error.message);
    }
}

module.exports = {
    CreateUser
}
