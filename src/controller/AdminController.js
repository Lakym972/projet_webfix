class AdminController {
    
    index(req, res) {
        res.render('admin/index', {username: req.user});
    }

}

export default new AdminController();