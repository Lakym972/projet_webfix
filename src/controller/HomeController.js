class HomeController {

    index(req, res) {
        res.render('home/index');
    }
}

export default new HomeController();