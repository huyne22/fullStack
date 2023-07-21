// import { ne } from "sequelize/types/lib/operators";
import { Op } from 'sequelize';
const { ne } = Op;
import db from "../models/index"
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
    return new Promise(async(resolve, reject) => {
        try{
            let userData = {}

            let isExist = await checkUserEmail(email)
            if(isExist){
                //user already exist

                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: {email : email},
                    raw: true,
                })

                if(user){
                    let check = await bcrypt.compareSync(password, user.password)
                    if(check){
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        delete user.password;
                        userData.user = user;
                    }else{
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';

                    }
                }else{
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`;
                }
            }else{
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in your system.Plz try other email`;

            }

            resolve(userData)
        }catch(e){
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async(resolve,reject) => {
        try{
            let user = await db.User.findOne({
                where: {email : userEmail},
                raw: true,
            })
            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
        }catch(e){
            reject(e)
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async(resolve,reject) =>{
        try{
            //xét 2 Th cho nó
            let users = ''
            if(userId === "ALL"){
                users = await db.User.findAll({
                    raw: true,
                    attributes:{
                        //ko lấy ra password
                        exclude:["password"]
                    }
                })
            }
            if(userId && userId !== "ALL"){
                users = await db.User.findOne({
                    where : {id : userId},
                    raw : true,
                    attributes:{
                        //ko lấy ra password
                        exclude:["password"]
                    }
                })
            }
            resolve(users);
        }catch(e){
            reject(e);
        }
    })
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

let createNewUser = (data) => {
    return new Promise( async(resolve, reject) => {
        try{
            //check email
            let check = await checkUserEmail(data.email);
            if(check){
                //có tồn tại
                resolve({
                    errCode: 1,
                    errMessage: "Your email is already in used, Plz try another email!"
                })
            }else{
                //chưa có email
                 //hash password
                 let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                 await db.User.create({
                     email: data.email,
                     password: hashPasswordFromBcrypt,
                     firstName: data.firstName,
                     lastName: data.lastName,
                     address: data.address,
                     phoneNumber: data.phoneNumber,
                     gender: data.gender === '1' ? true : false,
                     roleId: data.roleId
                 })
                 resolve({
                    errCode: 0,
                    errMessage: "OK!"
                 })
            }

        }catch(e){
            reject(e);
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            console.log("data", data)
            //TH ko truyền id
            if(!data.id){
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameter!"
                })
            }
            //TH có truyền id
            let user = await db.User.findOne({
                where : { id : data.id},
                raw : false
            })

            //có id trong db
            if(user){
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address

                await user.save();
                resolve({
                    errCode: 0,
                    errMessage: "Update the user success!"
                })
            }else{
                //id ko có ở db
                resolve({
                    errCode: 1,
                    errMessage: "User's not found!"
                })
            }
        }catch(e){
            reject(e)
        }
    })
}

let deleteUserData = async(userId) => {
    return new Promise(async(resolve, reject) => {
        try{
            // console.log(userId)

            //tìm id
            let user = await db.User.findOne({
                where: {id : userId},
            })
            // console.log(user)
            if(user){
                //đúng id 
                await db.User.destroy({
                    where: {id : userId}
                })
                resolve({
                    errCode: 0,
                    errMessage: "Delete the user success!"
                })
            }else{
                //sai id
                resolve({
                    errCode: 1,
                    errMessage: "User's not found!"
                })
            }
        }catch(e){
            reject(e)
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise (async(resolve, reject) => {
        try{
            if(!typeInput){
                resolve({
                    errCode: 1,
                    errMessage: "None typeInput",
                })
            }else{
                let res = {};
                let data = await db.Allcode.findAll({
                    where :{ type : typeInput},
                    raw : true,
                });
                res.errCode = 0;
                res.data = data;
                resolve(res);
            }
        }catch(e){
            console.log(e);
        }
    })
}

module.exports = {
    handleUserLogin : handleUserLogin,
    getAllUsers : getAllUsers,
    createNewUser : createNewUser,
    updateUserData : updateUserData,
    deleteUserData : deleteUserData,
    getAllCodeService : getAllCodeService,
}