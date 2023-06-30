
let getHomePage = (req, res) => {
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