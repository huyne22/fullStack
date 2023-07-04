import db from '../models/index';
import CRUDServer from '../services/CRUDServer'
let getHomePage = async (req, res) => {
    try{
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        })
    }catch(e){
        console.log(e)
    }
    // return res.render('homepage.ejs')

    //vì bên viewEngine đã đ/n đường dẫn nên ko cần thêm src..
}
let getAboutPage = (req, res) => {
    return res.render('test/about.ejs')
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}

let postCRUD = async (req, res) => {
   let message =  await CRUDServer.createNewUser(req.body)
   console.log(message)
    return res.send('hello')
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDServer.getAllUser();
    console.log("-----------------")
    console.log(data)
    console.log("-----------------")
    return res.render('displayCRUD.ejs', {
        data : data,
    })
 }
 let getEditCRUD = async (req, res) => {
    let userId = req.query.id;

    if(userId) {
        let userData = await CRUDServer.getUserInfoById(userId);
        return res.render("editCRUD.ejs", {
            user : userData,
        })

    }else{
        return res.send("Users not found!")
    }
}

let putCRUD = async(req, res) => {
    let data = req.body;
    await CRUDServer.updateUserData(data)
    return res.redirect("/get-crud");
}

module.exports = {
    getHomePage : getHomePage,
    getAboutPage : getAboutPage,
    getCRUD : getCRUD,
    postCRUD : postCRUD,
    displayGetCRUD : displayGetCRUD,
    getEditCRUD : getEditCRUD,
    putCRUD : putCRUD,
}