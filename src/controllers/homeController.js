
let getHomePage =  (req, res) => {
    // try{
    //     let data = await db.User.findAll();
    //     console.log('------------');
    //     console.log(data);
    //     console.log('------------');
    //     return res.render('homepage.ejs')
    // }catch(e){
    //     console.log(e)
    // }
    return res.render('homepage.ejs')

    //vì bên viewEngine đã đ/n đường dẫn nên ko cần thêm src..
}
let getAboutPage = (req, res) => {
    return res.render('test/about.ejs')
}

module.exports = {
    getHomePage : getHomePage,
    getAboutPage : getAboutPage,
}