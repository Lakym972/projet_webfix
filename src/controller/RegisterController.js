class RegisterController {
    
    index(req, res) {
        res.render('register/index');
    }
}

export default new RegisterController();