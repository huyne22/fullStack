// import bcrypt from 'bcryptjs';
import db from '../models/index';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
//sd hash password

let createNewUser = async (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstname,
                lastName: data.lastname,
                address: data.address,
                phoneNumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId
            })

            resolve("da tao xong")
        }catch(e){
            reject(e);
        }
        
    })
    console.log(data)
    console.log(hashPasswordFromBcrypt)
}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try{
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        }catch(e){
            reject(e)
        }
    })
};
let getAllUser = () => {
    return new Promise( async (resolve, reject) => {
        try{
            let users = db.User.findAll({
                raw: true,
            });

            resolve(users)
        }catch(e){
            reject(e)
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise( async(resolve,reject) => {
        try{
            let user = await db.User.findOne({
                where : { id : userId},
                raw : true,
            })
            if(user){
                resolve(user)
            }else{
                resolve([])
            }
        }catch(e){
            reject(e)
        }
    })
} 

let updateUserData = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where : {id : data.id},
            })
            if(user){
                user.firstName = data.firstname
                user.lastName = data.lastname
                user.address = data.address
                await user.save();
                resolve()
            }else{
                resolve()
            }
        }catch(e){
            reject(e)
        }
    })
}

module.exports = {
    createNewUser : createNewUser,
    getAllUser : getAllUser,
    getUserInfoById : getUserInfoById,
    updateUserData : updateUserData,
}