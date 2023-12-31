import userService from '../services/userService'

let handleLogin = async(req, res) => {
    let email = req.body.email
    let password = req.body.password
    if(!email || !password){
        return res.status(500).json({
            errCode : 1,
            errMessage: 'Missing inputs parameter!'
        })
    }

    let userData = await userService.handleUserLogin(email,password)
    console.log(userData)
    //check email exist
    //compare password

    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async(req,res) => {
    let id = req.query.id;
    //ko có id
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameter!",
            users : []
        })
    }
    //có id
    let users = await userService.getAllUsers(id);
    console.log(users.id)
    return res.status(200).json({
        errCode: 0,
        errMessage: "Ok!",
        users 
    })
}

let handleCreateNewUser = async(req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message)
}

let handleEditUser = async(req,res) => {
    let message = await userService.updateUserData(req.body)
    return res.status(200).json(message)
}

let handleDeleteUser = async(req,res) => {
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing require parameter!"
        })
    }
    let message = await userService.deleteUserData(req.body.id)
    return res.status(200).json(message)
}

let getAllCode = async(req, res) => {
    try{
        let data = await userService.getAllCodeService(req.query.type);
        console.log("data",data.errCode);
        return res.status(200).json(data)
   
    }catch(e){
        console.log("Get allcode errCode:", e)
        return res.status(200).json({
            errCode : -1,
            errMessage : 'Error from server',
        })
    }
}
module.exports = {
    handleLogin : handleLogin,
    handleGetAllUsers : handleGetAllUsers,
    handleCreateNewUser : handleCreateNewUser,
    handleEditUser : handleEditUser,
    handleDeleteUser : handleDeleteUser,
    getAllCode : getAllCode,
}