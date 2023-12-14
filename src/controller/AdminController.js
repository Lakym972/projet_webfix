import { detail, search } from "../services/servicesMovies.js";

class AdminController {
    
    index(req, res) {
        if(req.query.search != "" && req.query.search != undefined) {
            search(req.query.search).then(movies => {
            res.render('admin/index', {search: req.query.search, movies})
            });
        } else {
            res.render('admin/index') 
        }
    }

    description(req, res) {

        if(req.params.id !== undefined && parseInt(req.params.id) > 0) {
            detail(req.params.id).then(movie => {
                res.render('admin/movie', {movie})
            })
        } else {
            res.redirect('/admin/index')
        }
    }

}

export default new AdminController();